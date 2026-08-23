import { Routes } from '@angular/router';

export const PAYMENTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Payments | Veridex Finance',
    data: { breadcrumb: 'Payments' },
    loadComponent: () =>
      import('./pages/payments.page').then(m => m.PaymentsPage)
  }
];
