import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.enableDebugTools) {
    return next(req);
  }

  const startTime = Date.now();
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - startTime;
          console.debug(
            `%c[Veridex HTTP] ${req.method} ${req.url} %c${event.status} (${elapsed}ms)`,
            'color: #0052cc; font-weight: bold;',
            'color: #0f766e; font-weight: bold;'
          );
        }
      }
    })
  );
};
