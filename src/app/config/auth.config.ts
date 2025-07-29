import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
} from '@azure/msal-browser';
import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';

export const msalConfig = {
  auth: {
    clientId: '28a61451-6b13-4cf9-b2d1-a07a4d035cff', // this changes
    authority:
      'https://login.microsoftonline.com/31819927-6989-4bd0-b5e5-81740d4154c3', // this changes
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const protectedResourceMap = new Map<string, string[]>([
  [
    'http://192.168.100.100/gcceab/*',
    ['api://28a61451-6b13-4cf9-b2d1-a07a4d035cff/.default'], // this changes
  ],
]);

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['api://28a61451-6b13-4cf9-b2d1-a07a4d035cff/.default'], // this changes
    },
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
