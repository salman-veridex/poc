import { Routes } from '@angular/router';

export const LEGAL_PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Legal Products | Veridex Legal',
    data: { breadcrumb: 'Legal Products' },
    loadComponent: () =>
      import('./pages/legal-products.page').then(m => m.LegalProductsPage)
  }
];
