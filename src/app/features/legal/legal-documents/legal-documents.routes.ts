import { Routes } from '@angular/router';

export const LEGAL_DOCUMENTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Legal Documents | Veridex Legal',
    data: { breadcrumb: 'Legal Documents' },
    loadComponent: () =>
      import('./pages/legal-docs.page').then(m => m.LegalDocsPage)
  }
];
