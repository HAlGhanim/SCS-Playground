import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  AuthRequest,
  LoginResponse,
} from '../../interfaces/Authentication.interface';
import { isTokenValid as checkTokenValidity } from '../../utils/isTokenExpired';
import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: AuthRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}auth/login`, data)
      .pipe(
        tap((response) => {
          if (response.success && response.token) {
            this.setToken(response.token);
          }
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isTokenValid(): boolean {
    return checkTokenValidity(this.getToken());
  }

  // Additional methods for compatibility with migrated services
  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        username: payload.sub || payload.username,
        roles: payload.roles || [],
        authorities: payload.authorities || [],
      };
    } catch {
      return null;
    }
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) || false;
  }

  hasAuthority(authority: string): boolean {
    const user = this.getCurrentUser();
    return (
      user?.authorities?.some((auth: any) =>
        typeof auth === 'string'
          ? auth === authority
          : auth.authority === authority
      ) || false
    );
  }
}
