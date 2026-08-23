import { Routes } from '@angular/router';

export const COMPARISON_ROUTES: Routes = [
  {
    path: '',
    title: 'Product Comparison | Veridex Marketplace',
    data: { breadcrumb: 'Comparison' },
    loadComponent: () =>
      import('./pages/comparison.page').then(m => m.ComparisonPage)
  }
];
