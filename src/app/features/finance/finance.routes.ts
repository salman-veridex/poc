import { Routes } from '@angular/router';

export const FINANCE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'billing',
    pathMatch: 'full'
  },
  {
    path: 'billing',
    data: { breadcrumb: 'Finance' },
    loadChildren: () =>
      import('./billing/billing.routes').then(m => m.BILLING_ROUTES)
  },
  {
    path: 'payments',
    data: { breadcrumb: 'Finance' },
    loadChildren: () =>
      import('./payments/payments.routes').then(m => m.PAYMENTS_ROUTES)
  },
  {
    path: 'accounting',
    data: { breadcrumb: 'Finance' },
    loadChildren: () =>
      import('./accounting/accounting.routes').then(m => m.ACCOUNTING_ROUTES)
  },
  {
    path: 'commissions',
    data: { breadcrumb: 'Finance' },
    loadChildren: () =>
      import('./commissions/commissions.routes').then(m => m.COMMISSIONS_ROUTES)
  },
  {
    path: 'reconciliation',
    data: { breadcrumb: 'Finance' },
    loadChildren: () =>
      import('./reconciliation/reconciliation.routes').then(m => m.RECONCILIATION_ROUTES)
  },
  {
    path: 'reinsurance',
    data: { breadcrumb: 'Finance' },
    loadChildren: () =>
      import('./reinsurance/reinsurance.routes').then(m => m.REINSURANCE_ROUTES)
  }
];
