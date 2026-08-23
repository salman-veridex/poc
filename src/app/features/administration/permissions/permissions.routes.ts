import { Routes } from '@angular/router';

export const PERMISSIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Permissions Matrix | Veridex Administration',
    data: { breadcrumb: 'Permissions' },
    loadComponent: () =>
      import('./pages/permissions.page').then(m => m.PermissionsPage)
  }
];
