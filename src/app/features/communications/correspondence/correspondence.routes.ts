import { Routes } from '@angular/router';

export const CORRESPONDENCE_ROUTES: Routes = [
  {
    path: '',
    title: 'Correspondence | Veridex Communications',
    data: { breadcrumb: 'Correspondence' },
    loadComponent: () =>
      import('./pages/correspondence.page').then(m => m.CorrespondencePage)
  }
];
