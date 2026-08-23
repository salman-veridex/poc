import { Routes } from '@angular/router';

export const CARRIER_PORTAL_ROUTES: Routes = [
  {
    path: '',
    title: 'Carrier Portal | Veridex Marketplace',
    data: { breadcrumb: 'Carrier Portal' },
    loadComponent: () =>
      import('./pages/carrier-portal.page').then(m => m.CarrierPortalPage)
  }
];
