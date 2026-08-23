import { Routes } from '@angular/router';

export const QUOTES_ROUTES: Routes = [
  {
    path: '',
    title: 'Quotes & Rating | Veridex Quote & Underwriting',
    data: { breadcrumb: 'Quotes' },
    loadComponent: () =>
      import('./pages/quotes-list/quotes-list.page').then(m => m.QuotesListPage)
  }
];
