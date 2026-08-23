import { Routes } from '@angular/router';

export const RULES_ROUTES: Routes = [
  {
    path: '',
    title: 'Business Rules | Veridex Product Studio',
    data: { breadcrumb: 'Rules' },
    loadComponent: () =>
      import('./pages/rules.page').then(m => m.RulesPage)
  }
];
