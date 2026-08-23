import { Routes } from '@angular/router';

export const DISCOVERY_ROUTES: Routes = [
  {
    path: '',
    title: 'Product Discovery | Veridex Marketplace',
    data: { breadcrumb: 'Product Discovery' },
    loadComponent: () =>
      import('./pages/discovery.page').then(m => m.ProductDiscoveryPage)
  }
];
