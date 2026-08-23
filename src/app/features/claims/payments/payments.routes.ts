import { Routes } from '@angular/router';

export const CLAIM_PAYMENTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Claim Payments | Veridex Claims',
    data: { breadcrumb: 'Payments' },
    loadComponent: () =>
      import('./pages/payments.page').then(m => m.ClaimPaymentsPage)
  }
];
