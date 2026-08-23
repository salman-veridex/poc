import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const permissionGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredPermission = route.data['permission'] as string | undefined;
  const requiredPermissions = route.data['permissions'] as string[] | undefined;

  if (requiredPermission) {
    if (authService.hasPermission(requiredPermission)) {
      return true;
    }
  } else if (requiredPermissions && requiredPermissions.length > 0) {
    const matchAll = route.data['requireAllPermissions'] ?? false;
    const hasAccess = matchAll
      ? authService.hasAllPermissions(requiredPermissions)
      : authService.hasAnyPermission(requiredPermissions);

    if (hasAccess) {
      return true;
    }
  } else {
    // If no permission specified on route, permit
    return true;
  }

  return router.createUrlTree(['/dashboard'], {
    queryParams: { accessDenied: 'true' }
  });
};
