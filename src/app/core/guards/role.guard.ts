import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as string | undefined;
  const requiredRoles = route.data['roles'] as string[] | undefined;

  if (requiredRole) {
    if (authService.hasRole(requiredRole)) {
      return true;
    }
  } else if (requiredRoles && requiredRoles.length > 0) {
    if (authService.hasAnyRole(requiredRoles)) {
      return true;
    }
  } else {
    return true;
  }

  return router.createUrlTree(['/dashboard'], {
    queryParams: { roleDenied: 'true' }
  });
};
