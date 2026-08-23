import { Routes } from '@angular/router';

export const ACCOUNTING_ROUTES: Routes = [
  {
    path: '',
    title: 'General Ledger & Accounting | Veridex Finance',
    data: { breadcrumb: 'Accounting' },
    loadComponent: () =>
      import('./pages/accounting.page').then(m => m.AccountingPage)
  }
];
