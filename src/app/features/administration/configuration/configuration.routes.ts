import { Routes } from '@angular/router';

export const CONFIGURATION_ROUTES: Routes = [
  {
    path: '',
    title: 'Configuration | Veridex Administration',
    data: { breadcrumb: 'Configuration' },
    loadComponent: () =>
      import('./pages/config.page').then(m => m.ConfigPage)
  }
];
