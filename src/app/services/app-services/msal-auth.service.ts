import { Injectable, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import {
  AuthenticationResult,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class MsalAuthService {
  private msalService = inject(MsalService);

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }

  /**
   * Get the current user
   */
  getCurrentUser() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      return accounts[0];
    }
    return null;
  }

  /**
   * Get user display name
   */
  getUserDisplayName(): string {
    const user = this.getCurrentUser();
    return user?.name || user?.username || 'User';
  }

  /**
   * Get user email
   */
  getUserEmail(): string {
    const user = this.getCurrentUser();
    return user?.username || '';
  }

  /**
   * Login with popup
   */
  loginPopup(): Observable<AuthenticationResult> {
    const loginRequest: PopupRequest = {
      scopes: environment.msal.entraId.apiScopes,
    };

    return from(this.msalService.loginPopup(loginRequest)).pipe(
      map((response) => {
        if (response) {
          this.msalService.instance.setActiveAccount(response.account);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login failed', error);
        throw error;
      })
    );
  }

  /**
   * Login with redirect
   */
  loginRedirect(): void {
    const loginRequest: RedirectRequest = {
      scopes: environment.msal.entraId.apiScopes,
    };
    this.msalService.loginRedirect(loginRequest);
  }

  /**
   * Logout with popup
   */
  logoutPopup(): Observable<void> {
    const logoutRequest = {
      account: this.getCurrentUser(),
    };
    return from(this.msalService.logoutPopup(logoutRequest));
  }

  /**
   * Logout with redirect
   */
  logoutRedirect(): void {
    const logoutRequest = {
      account: this.getCurrentUser(),
    };
    this.msalService.logoutRedirect(logoutRequest);
  }

  /**
   * Get access token silently
   */
  getAccessToken(): Observable<string | null> {
    const account = this.getCurrentUser();
    if (!account) {
      return of(null);
    }

    const request = {
      scopes: environment.msal.entraId.apiScopes,
      account: account,
    };

    return from(this.msalService.acquireTokenSilent(request)).pipe(
      map((response) => response.accessToken),
      catchError((error) => {
        console.error('Token acquisition failed', error);
        return from(this.msalService.acquireTokenPopup(request)).pipe(
          map((response) => response.accessToken),
          catchError(() => of(null))
        );
      })
    );
  }
}
