import { Routes } from '@angular/router';

export const PRODUCT_STUDIO_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    data: { breadcrumb: 'Product Studio' },
    loadChildren: () =>
      import('./product/product.routes').then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'coverage',
    data: { breadcrumb: 'Product Studio' },
    loadChildren: () =>
      import('./coverage/coverage.routes').then(m => m.COVERAGE_ROUTES)
  },
  {
    path: 'risk-configuration',
    data: { breadcrumb: 'Product Studio' },
    loadChildren: () =>
      import('./risk-configuration/risk-configuration.routes').then(m => m.RISK_CONFIGURATION_ROUTES)
  },
  {
    path: 'questions',
    data: { breadcrumb: 'Product Studio' },
    loadChildren: () =>
      import('./questions/questions.routes').then(m => m.QUESTIONS_ROUTES)
  },
  {
    path: 'rules',
    data: { breadcrumb: 'Product Studio' },
    loadChildren: () =>
      import('./rules/rules.routes').then(m => m.RULES_ROUTES)
  },
  {
    path: 'forms-mapping',
    data: { breadcrumb: 'Product Studio' },
    loadChildren: () =>
      import('./forms-mapping/forms-mapping.routes').then(m => m.FORMS_MAPPING_ROUTES)
  },
  {
    path: 'versioning',
    data: { breadcrumb: 'Product Studio' },
    loadChildren: () =>
      import('./versioning/versioning.routes').then(m => m.VERSIONING_ROUTES)
  },
  {
    path: 'publishing',
    data: { breadcrumb: 'Product Studio' },
    loadChildren: () =>
      import('./publishing/publishing.routes').then(m => m.PUBLISHING_ROUTES)
  }
];
