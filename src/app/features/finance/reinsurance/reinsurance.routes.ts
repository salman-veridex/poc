import { Routes } from '@angular/router';

export const REINSURANCE_ROUTES: Routes = [
  {
    path: '',
    title: 'Reinsurance | Veridex Finance',
    data: { breadcrumb: 'Reinsurance' },
    loadComponent: () =>
      import('./pages/reinsurance.page').then(m => m.ReinsurancePage)
  }
];
