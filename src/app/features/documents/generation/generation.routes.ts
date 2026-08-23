import { Routes } from '@angular/router';

export const GENERATION_ROUTES: Routes = [
  {
    path: '',
    title: 'Document Generation | Veridex Documents',
    data: { breadcrumb: 'Generation' },
    loadComponent: () =>
      import('./pages/generation.page').then(m => m.GenerationPage)
  }
];
