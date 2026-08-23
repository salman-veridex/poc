import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

const EXCLUDED_AUTH_ENDPOINTS = [
  'auth/login',
  'auth/forgot-password',
  'auth/reset-password'
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getAccessToken();

  // Check if endpoint is public or excluded
  const isExcluded = EXCLUDED_AUTH_ENDPOINTS.some(endpoint => req.url.includes(endpoint));

  let authReq = req;
  if (token && !isExcluded && !req.headers.has('Authorization')) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 401 Unauthorized handling (avoid loop if already on login page or attempting login)
      if (error.status === 401 && !req.url.includes('auth/login')) {
        authService.logout();
        router.navigate(['/auth/login'], {
          queryParams: { sessionExpired: 'true' }
        });
      }
      return throwError(() => error);
    })
  );
};
