import { Routes } from '@angular/router';

export const CLOSURE_ROUTES: Routes = [
  {
    path: '',
    title: 'Claim Closure | Veridex Claims',
    data: { breadcrumb: 'Closure' },
    loadComponent: () =>
      import('./pages/closure.page').then(m => m.ClosurePage)
  }
];
