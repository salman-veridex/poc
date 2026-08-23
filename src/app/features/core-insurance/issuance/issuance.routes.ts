import { Routes } from '@angular/router';

export const ISSUANCE_ROUTES: Routes = [
  {
    path: '',
    title: 'Policy Issuance | Veridex Core Insurance',
    data: { breadcrumb: 'Issuance' },
    loadComponent: () =>
      import('./pages/issuance.page').then(m => m.IssuancePage)
  }
];
