import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const user = authService.user();
  
  const headers: Record<string, string> = {
    'X-Client-Platform': 'Veridex-Insurance-Web-Angular-21',
    'X-Request-Timestamp': new Date().toISOString()
  };

  if (user?.tenantId) {
    headers['X-Tenant-ID'] = user.tenantId;
  }

  const modifiedReq = req.clone({
    setHeaders: headers
  });

  return next(modifiedReq);
};
