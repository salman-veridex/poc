import { Routes } from '@angular/router';

export const COMMISSIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Commissions | Veridex Finance',
    data: { breadcrumb: 'Commissions' },
    loadComponent: () =>
      import('./pages/commissions.page').then(m => m.CommissionsPage)
  }
];
