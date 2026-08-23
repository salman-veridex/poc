import { Routes } from '@angular/router';

export const COMM_TEMPLATES_ROUTES: Routes = [
  {
    path: '',
    title: 'Communication Templates | Veridex Communications',
    data: { breadcrumb: 'Templates' },
    loadComponent: () =>
      import('./pages/comm-templates.page').then(m => m.CommTemplatesPage)
  }
];
