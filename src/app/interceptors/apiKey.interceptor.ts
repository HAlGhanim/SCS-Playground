import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environment';

export const ApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
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
