import { Routes } from '@angular/router';

export const POLICY_ROUTES: Routes = [
  {
    path: '',
    title: 'Policy 360 | Veridex Core Insurance',
    data: { breadcrumb: 'Policies' },
    loadComponent: () =>
      import('./pages/policy-list/policy-list.page').then(m => m.PolicyListPage)
  },
  {
    path: ':id',
    title: 'Policy 360 Details | Veridex Core Insurance',
    data: { breadcrumb: 'Policy Details' },
    loadComponent: () =>
      import('./pages/policy-detail/policy-detail.page').then(m => m.PolicyDetailPage)
  }
];
