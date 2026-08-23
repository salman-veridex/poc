import { Routes } from '@angular/router';

export const RENEWAL_ROUTES: Routes = [
  {
    path: '',
    title: 'Renewals | Veridex Core Insurance',
    data: { breadcrumb: 'Renewals' },
    loadComponent: () =>
      import('./pages/renewal.page').then(m => m.RenewalPage)
  }
];
