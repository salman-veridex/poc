import { Routes } from '@angular/router';

export const COVERAGE_VERIFICATION_ROUTES: Routes = [
  {
    path: '',
    title: 'Coverage Verification | Veridex Claims',
    data: { breadcrumb: 'Coverage Verification' },
    loadComponent: () =>
      import('./pages/coverage-verification.page').then(m => m.CoverageVerificationPage)
  }
];
