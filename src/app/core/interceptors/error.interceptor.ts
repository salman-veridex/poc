import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface ApiErrorPayload {
  message: string;
  status: number;
  statusText: string;
  error?: unknown;
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred in Veridex Enterprise Services.';

      if (error.error instanceof ErrorEvent) {
        // Client-side / Network Error
        errorMessage = `Client network error: ${error.error.message}`;
      } else {
        // Server-side Error
        switch (error.status) {
          case 400:
            errorMessage = error.error?.message || 'Invalid request payload or schema validation failed.';
            break;
          case 401:
            errorMessage = error.error?.message || 'Authentication credentials missing or session expired.';
            break;
          case 403:
            errorMessage = error.error?.message || 'Access denied: You do not have authority to execute this operation.';
            break;
          case 404:
            errorMessage = error.error?.message || 'The requested insurance resource was not found.';
            break;
          case 409:
            errorMessage = error.error?.message || 'Conflict: Record modified by another underwriter/user or version lock active.';
            break;
          case 422:
            errorMessage = error.error?.message || 'Unprocessable entity: Underwriting or policy business validation error.';
            break;
          case 429:
            errorMessage = error.error?.message || 'Rate limit exceeded: Too many requests sent to core services. Please wait.';
            break;
          case 500:
          case 502:
          case 503:
            errorMessage = error.error?.message || 'Insurance core services temporarily unavailable. Please retry shortly.';
            break;
          default:
            errorMessage = error.error?.message || `Service error [HTTP ${error.status}]`;
        }
      }

      console.error(`[Veridex API Error] [${req.method} ${req.url}]:`, errorMessage, error);

      // Preserve backend error payload for feature-level consumption
      const apiError: ApiErrorPayload = {
        message: errorMessage,
        status: error.status,
        statusText: error.statusText,
        error: error.error
      };

      return throwError(() => apiError);
    })
  );
};
