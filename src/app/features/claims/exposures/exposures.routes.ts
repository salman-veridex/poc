import { Routes } from '@angular/router';

export const EXPOSURES_ROUTES: Routes = [
  {
    path: '',
    title: 'Exposures | Veridex Claims',
    data: { breadcrumb: 'Exposures' },
    loadComponent: () =>
      import('./pages/exposures.page').then(m => m.ExposuresPage)
  }
];
