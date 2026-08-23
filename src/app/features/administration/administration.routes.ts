import { Routes } from '@angular/router';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    data: { breadcrumb: 'Administration' },
    loadChildren: () =>
      import('./users/users.routes').then(m => m.USERS_ROUTES)
  },
  {
    path: 'roles',
    data: { breadcrumb: 'Administration' },
    loadChildren: () =>
      import('./roles/roles.routes').then(m => m.ROLES_ROUTES)
  },
  {
    path: 'permissions',
    data: { breadcrumb: 'Administration' },
    loadChildren: () =>
      import('./permissions/permissions.routes').then(m => m.PERMISSIONS_ROUTES)
  },
  {
    path: 'organizations',
    data: { breadcrumb: 'Administration' },
    loadChildren: () =>
      import('./organizations/organizations.routes').then(m => m.ORGANIZATIONS_ROUTES)
  },
  {
    path: 'configuration',
    data: { breadcrumb: 'Administration' },
    loadChildren: () =>
      import('./configuration/configuration.routes').then(m => m.CONFIGURATION_ROUTES)
  },
  {
    path: 'audit',
    data: { breadcrumb: 'Administration' },
    loadChildren: () =>
      import('./audit/audit.routes').then(m => m.AUDIT_ROUTES)
  }
];
