import { Routes } from '@angular/router';

export const MARKETPLACE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'product-discovery',
    pathMatch: 'full'
  },
  {
    path: 'product-discovery',
    data: { breadcrumb: 'Marketplace' },
    loadChildren: () =>
      import('./product-discovery/discovery.routes').then(m => m.DISCOVERY_ROUTES)
  },
  {
    path: 'comparison',
    data: { breadcrumb: 'Marketplace' },
    loadChildren: () =>
      import('./comparison/comparison.routes').then(m => m.COMPARISON_ROUTES)
  },
  {
    path: 'broker-portal',
    data: { breadcrumb: 'Marketplace' },
    loadChildren: () =>
      import('./broker-portal/broker-portal.routes').then(m => m.BROKER_PORTAL_ROUTES)
  },
  {
    path: 'mga-portal',
    data: { breadcrumb: 'Marketplace' },
    loadChildren: () =>
      import('./mga-portal/mga-portal.routes').then(m => m.MGA_PORTAL_ROUTES)
  },
  {
    path: 'carrier-portal',
    data: { breadcrumb: 'Marketplace' },
    loadChildren: () =>
      import('./carrier-portal/carrier-portal.routes').then(m => m.CARRIER_PORTAL_ROUTES)
  },
  {
    path: 'customer-portal',
    data: { breadcrumb: 'Marketplace' },
    loadChildren: () =>
      import('./customer-portal/customer-portal.routes').then(m => m.CUSTOMER_PORTAL_ROUTES)
  },
  {
    path: 'partner-journeys',
    data: { breadcrumb: 'Marketplace' },
    loadChildren: () =>
      import('./partner-journeys/partner-journeys.routes').then(m => m.PARTNER_JOURNEYS_ROUTES)
  }
];
