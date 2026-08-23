import { Routes } from '@angular/router';

export const ORGANIZATIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Organizations & Tenants | Veridex Administration',
    data: { breadcrumb: 'Organizations' },
    loadComponent: () =>
      import('./pages/orgs.page').then(m => m.OrgsPage)
  }
];
