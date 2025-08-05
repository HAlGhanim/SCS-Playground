import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, map } from 'rxjs/operators';
import { apiScopes } from '../config/auth.config';

export const authGuard = () => {
  const msalService = inject(MsalService);
  const msalBroadcastService = inject(MsalBroadcastService);
  const router = inject(Router);

  return msalBroadcastService.inProgress$.pipe(
    filter((status: InteractionStatus) => status === InteractionStatus.None),
    map(() => {
      const isAuthenticated = msalService.instance.getAllAccounts().length > 0;

      if (!isAuthenticated) {
        const attemptedUrl = window.location.pathname + window.location.search;
        sessionStorage.setItem('redirectUrl', attemptedUrl);

        msalService.loginRedirect({
          scopes: apiScopes,
        });
        return false;
      }

      return true;
    })
  );
};
