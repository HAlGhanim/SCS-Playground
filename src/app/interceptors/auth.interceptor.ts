import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError, from, switchMap } from 'rxjs';
import { apiScopes } from '../config/auth.config';
import { environment } from '../../environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.includes('login.microsoftonline.com') ||
    req.url.includes('graph.microsoft.com') ||
    req.url.includes('login.windows.net') ||
    req.url.includes('login.live.com')
  ) {
    return next(req);
  }

  const msalService = inject(MsalService);
  const accounts = msalService.instance.getAllAccounts();

  if (accounts.length === 0) {
    console.warn('No authenticated user found, blocking API request');
    return next(req);
  }

  const account = accounts[0];
  const tokenRequest = {
    scopes: apiScopes,
    account: account,
  };

  return from(msalService.acquireTokenSilent(tokenRequest)).pipe(
    switchMap((tokenResponse) => {
      let headers = req.headers
        .set('PIFSSApiKey', environment.pifssApiKey)
        .set('Authorization', `Bearer ${tokenResponse.accessToken}`);

      const authReq = req.clone({ headers });
      return next(authReq);
    }),
    catchError((error) => {
      console.error('Failed to acquire token silently:', error);

      return from(msalService.acquireTokenPopup(tokenRequest)).pipe(
        switchMap((tokenResponse) => {
          let headers = req.headers
            .set('PIFSSApiKey', environment.pifssApiKey)
            .set('Authorization', `Bearer ${tokenResponse.accessToken}`);

          const authReq = req.clone({ headers });
          return next(authReq);
        }),
        catchError((popupError) => {
          console.error('Failed to acquire token through popup:', popupError);
          throw new Error('Authentication required');
        })
      );
    })
  );
};
