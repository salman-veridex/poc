import { Routes } from '@angular/router';

export const PARTNER_JOURNEYS_ROUTES: Routes = [
  {
    path: '',
    title: 'Partner Journeys | Veridex Marketplace',
    data: { breadcrumb: 'Partner Journeys' },
    loadComponent: () =>
      import('./pages/partner-journeys.page').then(m => m.PartnerJourneysPage)
  }
];
