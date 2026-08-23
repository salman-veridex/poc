import { Routes } from '@angular/router';

export const RESERVES_ROUTES: Routes = [
  {
    path: '',
    title: 'Reserves | Veridex Claims',
    data: { breadcrumb: 'Reserves' },
    loadComponent: () =>
      import('./pages/reserves.page').then(m => m.ReservesPage)
  }
];
