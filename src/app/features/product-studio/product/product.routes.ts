import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    title: 'Product Portfolio | Veridex Product Studio',
    data: { breadcrumb: 'Products' },
    loadComponent: () =>
      import('./pages/product-list/product-list.page').then(m => m.ProductListPage)
  },
  {
    path: 'create',
    title: 'Create Insurance Product | Veridex Product Studio',
    data: { breadcrumb: 'Create Product' },
    loadComponent: () =>
      import('./pages/product-create/product-create.page').then(m => m.ProductCreatePage)
  },
  {
    path: ':id',
    title: 'Product Specification | Veridex Product Studio',
    data: { breadcrumb: 'Product Details' },
    loadComponent: () =>
      import('./pages/product-detail/product-detail.page').then(m => m.ProductDetailPage)
  }
];
