import { Routes } from '@angular/router';

export const CANCELLATION_ROUTES: Routes = [
  {
    path: '',
    title: 'Policy Cancellation | Veridex Core Insurance',
    data: { breadcrumb: 'Cancellation' },
    loadComponent: () =>
      import('./pages/cancellation.page').then(m => m.CancellationPage)
  }
];
