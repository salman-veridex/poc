import { Routes } from '@angular/router';

export const BROKER_PORTAL_ROUTES: Routes = [
  {
    path: '',
    title: 'Broker Portal | Veridex Marketplace',
    data: { breadcrumb: 'Broker Portal' },
    loadComponent: () =>
      import('./pages/broker-portal.page').then(m => m.BrokerPortalPage)
  }
];
