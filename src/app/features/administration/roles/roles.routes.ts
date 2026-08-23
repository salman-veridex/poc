import { Routes } from '@angular/router';

export const ROLES_ROUTES: Routes = [
  {
    path: '',
    title: 'Roles & RBAC | Veridex Administration',
    data: { breadcrumb: 'Roles' },
    loadComponent: () =>
      import('./pages/roles-list.page').then(m => m.RolesListPage)
  }
];
