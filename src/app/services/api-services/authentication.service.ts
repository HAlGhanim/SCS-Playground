import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  AuthRequest,
  LoginResponse,
} from '../../interfaces/Authentication.interface';
import { isTokenValid as checkTokenValidity } from '../../utils/isTokenExpired';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  login(data: AuthRequest): Observable<LoginResponse> {
    return this.post<LoginResponse, AuthRequest>('auth/login', data).pipe(
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

  logout(): Observable<any> {
    return this.post('auth/logout', {}).pipe(
      tap(() => {
        this.clearToken();
        this.router.navigate(['/login']);
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
}
