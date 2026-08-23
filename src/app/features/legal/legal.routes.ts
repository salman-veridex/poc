import { Routes } from '@angular/router';

export const LEGAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full'
  },
  {
    path: 'products',
    data: { breadcrumb: 'Legal & Compliance' },
    loadChildren: () =>
      import('./products/legal-products.routes').then(m => m.LEGAL_PRODUCTS_ROUTES)
  },
  {
    path: 'cases',
    data: { breadcrumb: 'Legal & Compliance' },
    loadChildren: () =>
      import('./cases/cases.routes').then(m => m.CASES_ROUTES)
  },
  {
    path: 'legal-documents',
    data: { breadcrumb: 'Legal & Compliance' },
    loadChildren: () =>
      import('./legal-documents/legal-documents.routes').then(m => m.LEGAL_DOCUMENTS_ROUTES)
  }
];
