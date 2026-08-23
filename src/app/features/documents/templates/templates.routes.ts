import { Routes } from '@angular/router';

export const TEMPLATES_ROUTES: Routes = [
  {
    path: '',
    title: 'Templates | Veridex Documents',
    data: { breadcrumb: 'Templates' },
    loadComponent: () =>
      import('./pages/templates.page').then(m => m.TemplatesPage)
  }
];
