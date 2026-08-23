import { Routes } from '@angular/router';

export const VERSIONING_ROUTES: Routes = [
  {
    path: '',
    title: 'Product Versioning | Veridex Product Studio',
    data: { breadcrumb: 'Versioning' },
    loadComponent: () =>
      import('./pages/versioning.page').then(m => m.VersioningPage)
  }
];
