import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { retry, throwError, timer } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const shouldRetry = req.method === 'GET';
  const maxRetries = 3;
  const retryDelay = 1000;

  if (!shouldRetry) {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: maxRetries,
      delay: (error, retryCount) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0 || error.status >= 500) {
            console.log(`Retrying request (${retryCount}/${maxRetries})...`);
            return timer(retryDelay * retryCount);
          }
        }
        return throwError(() => error);
      },
    })
  );
};
