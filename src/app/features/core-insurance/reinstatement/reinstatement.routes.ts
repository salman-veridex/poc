import { Routes } from '@angular/router';

export const REINSTATEMENT_ROUTES: Routes = [
  {
    path: '',
    title: 'Policy Reinstatement | Veridex Core Insurance',
    data: { breadcrumb: 'Reinstatement' },
    loadComponent: () =>
      import('./pages/reinstatement.page').then(m => m.ReinstatementPage)
  }
];
