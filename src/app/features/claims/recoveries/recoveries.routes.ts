import { Routes } from '@angular/router';

export const RECOVERIES_ROUTES: Routes = [
  {
    path: '',
    title: 'Recoveries & Subrogation | Veridex Claims',
    data: { breadcrumb: 'Recoveries' },
    loadComponent: () =>
      import('./pages/recoveries.page').then(m => m.RecoveriesPage)
  }
];
