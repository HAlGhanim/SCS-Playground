import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
} from '@angular/common/http';
import * as i from './interceptors';
import {
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import {
  MSALInstanceFactory,
  MSALGuardConfigFactory,
  MSALInterceptorConfigFactory,
} from './config/auth.config';
import { APP_BASE_HREF } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';

function getBaseHref(): string {
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  return isLocalhost ? '/' : '/gcceab/';
}

const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.includes('login.microsoftonline.com') ||
    req.url.includes('graph.microsoft.com') ||
    req.url.includes('login.windows.net') ||
    req.url.includes('login.live.com')
  ) {
    return next(req);
  }

  const headers = req.headers.set('PIFSSApiKey', environment.pifssApiKey);
  const modifiedReq = req.clone({ headers });

  return next(modifiedReq);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withInterceptors([
        headerInterceptor,
        i.ErrorInterceptor,
        i.loadingInterceptor,
        i.retryInterceptor,
      ])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useValue: getBaseHref(),
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};
