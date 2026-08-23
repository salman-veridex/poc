import { Routes } from '@angular/router';

export const CLASSIFICATION_ROUTES: Routes = [
  {
    path: '',
    title: 'Classification | Veridex Documents',
    data: { breadcrumb: 'Classification' },
    loadComponent: () =>
      import('./pages/classification.page').then(m => m.ClassificationPage)
  }
];
