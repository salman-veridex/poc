import { Routes } from '@angular/router';

export const REFERRALS_ROUTES: Routes = [
  {
    path: '',
    title: 'Referrals | Veridex Quote & Underwriting',
    data: { breadcrumb: 'Referrals' },
    loadComponent: () =>
      import('./pages/referrals.page').then(m => m.ReferralsPage)
  }
];
