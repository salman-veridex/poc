import { Routes } from '@angular/router';

export const BILLING_ROUTES: Routes = [
  {
    path: '',
    title: 'Billing & Invoices | Veridex Finance',
    data: { breadcrumb: 'Billing' },
    loadComponent: () =>
      import('./pages/billing-list/billing-list.page').then(m => m.BillingListPage)
  }
];
