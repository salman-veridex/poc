import { Routes } from '@angular/router';

export const PUBLISHING_ROUTES: Routes = [
  {
    path: '',
    title: 'Publishing | Veridex Product Studio',
    data: { breadcrumb: 'Publishing' },
    loadComponent: () =>
      import('./pages/publishing.page').then(m => m.PublishingPage)
  }
];
