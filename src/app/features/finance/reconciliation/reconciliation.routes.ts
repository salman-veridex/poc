import { Routes } from '@angular/router';

export const RECONCILIATION_ROUTES: Routes = [
  {
    path: '',
    title: 'Reconciliation | Veridex Finance',
    data: { breadcrumb: 'Reconciliation' },
    loadComponent: () =>
      import('./pages/reconciliation.page').then(m => m.ReconciliationPage)
  }
];
