import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
} from '@azure/msal-browser';
import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import { environment } from '../../environment';

function getMsalConfig() {
  const isLocalhost =
    window.location.hostname === 'localhost' && window.location.port === '4200';

  return isLocalhost
    ? environment.msal.local.redirectUri
    : environment.msal.dev.redirectUri;
}

const selectedMsalConfig = getMsalConfig();

export const msalConfig = {
  auth: {
    clientId: environment.msal.entraId.clientId,
    authority: environment.msal.entraId.authority,
    redirectUri: selectedMsalConfig,
    postLogoutRedirectUri: selectedMsalConfig,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0: // Error
            console.error(message);
            return;
          case 1: // Warning
            console.warn(message);
            return;
          case 2: // Info
            console.info(message);
            return;
          case 3: // Verbose
            console.debug(message);
            return;
        }
      },
      logLevel: 3, // Set to 0 in production
    },
  },
};

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: environment.msal.entraId.apiScopes,
    },
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  // GCC Report API
  protectedResourceMap.set(
    environment.endpoints.gcc.gccRpt + '*',
    environment.msal.entraId.apiScopes
  );

  // PBDapper API
  protectedResourceMap.set(
    environment.endpoints.pbDapperUrl + '*',
    environment.msal.entraId.apiScopes
  );

  // Base API
  protectedResourceMap.set(
    environment.baseUrl + '*',
    environment.msal.entraId.apiScopes
  );

  // CoreBizApi
  protectedResourceMap.set(
    environment.employedAbroad + '*',
    environment.msal.entraId.apiScopes
  );

  // SCS Backend
  protectedResourceMap.set(
    environment.scsbackendUrl + '*',
    environment.msal.entraId.apiScopes
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
