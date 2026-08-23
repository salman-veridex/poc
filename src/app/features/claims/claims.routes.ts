import { Routes } from '@angular/router';

export const CLAIMS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'fnol',
    pathMatch: 'full'
  },
  {
    path: 'fnol',
    data: { breadcrumb: 'Claims' },
    loadChildren: () =>
      import('./fnol/fnol.routes').then(m => m.FNOL_ROUTES)
  },
  {
    path: 'coverage-verification',
    data: { breadcrumb: 'Claims' },
    loadChildren: () =>
      import('./coverage-verification/coverage-verification.routes').then(m => m.COVERAGE_VERIFICATION_ROUTES)
  },
  {
    path: 'exposures',
    data: { breadcrumb: 'Claims' },
    loadChildren: () =>
      import('./exposures/exposures.routes').then(m => m.EXPOSURES_ROUTES)
  },
  {
    path: 'reserves',
    data: { breadcrumb: 'Claims' },
    loadChildren: () =>
      import('./reserves/reserves.routes').then(m => m.RESERVES_ROUTES)
  },
  {
    path: 'payments',
    data: { breadcrumb: 'Claims' },
    loadChildren: () =>
      import('./payments/payments.routes').then(m => m.CLAIM_PAYMENTS_ROUTES)
  },
  {
    path: 'recoveries',
    data: { breadcrumb: 'Claims' },
    loadChildren: () =>
      import('./recoveries/recoveries.routes').then(m => m.RECOVERIES_ROUTES)
  },
  {
    path: 'vendors',
    data: { breadcrumb: 'Claims' },
    loadChildren: () =>
      import('./vendors/vendors.routes').then(m => m.VENDORS_ROUTES)
  },
  {
    path: 'closure',
    data: { breadcrumb: 'Claims' },
    loadChildren: () =>
      import('./closure/closure.routes').then(m => m.CLOSURE_ROUTES)
  }
];
