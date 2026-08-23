import { Routes } from '@angular/router';

export const CUSTOMER_PORTAL_ROUTES: Routes = [
  {
    path: '',
    title: 'Customer Portal | Veridex Marketplace',
    data: { breadcrumb: 'Customer Portal' },
    loadComponent: () =>
      import('./pages/customer-portal.page').then(m => m.CustomerPortalPage)
  }
];
