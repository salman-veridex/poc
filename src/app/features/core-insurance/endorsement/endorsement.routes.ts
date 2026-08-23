import { Routes } from '@angular/router';

export const ENDORSEMENT_ROUTES: Routes = [
  {
    path: '',
    title: 'Policy Endorsements | Veridex Core Insurance',
    data: { breadcrumb: 'Endorsements' },
    loadComponent: () =>
      import('./pages/endorsement.page').then(m => m.EndorsementPage)
  }
];
