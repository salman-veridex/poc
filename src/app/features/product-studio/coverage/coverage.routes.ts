import { Routes } from '@angular/router';

export const COVERAGE_ROUTES: Routes = [
  {
    path: '',
    title: 'Coverages | Veridex Product Studio',
    data: { breadcrumb: 'Coverages' },
    loadComponent: () =>
      import('./pages/coverage-list/coverage.page').then(m => m.CoveragePage)
  }
];
