import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';
import { AuthenticationService } from '../services/api-services/authentication.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const token = authService.getToken();

  let headers = req.headers.set('PIFSSApiKey', environment.pifssApiKey);

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({ headers });

  return next(authReq);
};
