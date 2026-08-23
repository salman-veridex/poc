import { Routes } from '@angular/router';

export const VENDORS_ROUTES: Routes = [
  {
    path: '',
    title: 'Claims Vendors | Veridex Claims',
    data: { breadcrumb: 'Vendors' },
    loadComponent: () =>
      import('./pages/vendors.page').then(m => m.VendorsPage)
  }
];
