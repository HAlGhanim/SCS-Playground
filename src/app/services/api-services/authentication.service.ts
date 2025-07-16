import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  AuthRequest,
  LoginResponse,
  RegisterResponse,
} from '../../interfaces/Authentication.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  login(data: AuthRequest): Observable<LoginResponse> {
    return this.post<LoginResponse, AuthRequest>('auth/login', data).pipe(
      tap((response) => {
        if (response.success) {
          console.log('Login successful');
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  register(data: AuthRequest): Observable<RegisterResponse> {
    return this.post<RegisterResponse, AuthRequest>('auth/register', data).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this.post('auth/logout', {}).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        return throwError(() => error);
      })
    );
  }

  checkAuth(): Observable<{ isAuthenticated: boolean; username?: string }> {
    return this.get<{ isAuthenticated: boolean; username?: string }>(
      'auth/check'
    ).pipe(
      catchError(() => {
        return throwError(() => ({ isAuthenticated: false }));
      })
    );
  }
}
