import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred in Veridex Enterprise Services.';

      if (error.error instanceof ErrorEvent) {
        // Client-side / Network Error
        errorMessage = `Client error: ${error.error.message}`;
      } else {
        // Server-side Error
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Invalid request payload or validation failed.';
            break;
          case 403:
            errorMessage = 'Access denied: You do not have permission to execute this operation.';
            break;
          case 404:
            errorMessage = 'The requested insurance resource was not found.';
            break;
          case 409:
            errorMessage = error.error?.message || 'Conflict: Record modified by another underwriter/user.';
            break;
          case 422:
            errorMessage = error.error?.message || 'Unprocessable entity: Rating or policy business validation error.';
            break;
          case 500:
          case 502:
          case 503:
            errorMessage = 'Insurance core services temporarily unavailable. Please retry shortly.';
            break;
          default:
            errorMessage = error.error?.message || `Server error [HTTP ${error.status}]`;
        }
      }

      console.error(`[Veridex API Error] [${req.method} ${req.url}]:`, errorMessage, error);
      return throwError(() => new Error(errorMessage));
    })
  );
};
