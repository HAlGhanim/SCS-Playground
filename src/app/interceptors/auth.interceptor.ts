import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.includes('login.microsoftonline.com') ||
    req.url.includes('graph.microsoft.com') ||
    req.url.includes('login.windows.net') ||
    req.url.includes('login.live.com')
  ) {
    return next(req);
  }

  let headers = req.headers.set('PIFSSApiKey', environment.pifssApiKey);
  const authReq = req.clone({ headers });

  return next(authReq);
};
