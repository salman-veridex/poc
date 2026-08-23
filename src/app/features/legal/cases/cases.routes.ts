import { Routes } from '@angular/router';

export const CASES_ROUTES: Routes = [
  {
    path: '',
    title: 'Legal Cases | Veridex Legal',
    data: { breadcrumb: 'Cases' },
    loadComponent: () =>
      import('./pages/cases-list.page').then(m => m.CasesListPage)
  }
];
