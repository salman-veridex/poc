import { Routes } from '@angular/router';

export const POLICY_SERVICING_ROUTES: Routes = [
  {
    path: '',
    title: 'Policy Servicing | Veridex Core Insurance',
    data: { breadcrumb: 'Servicing' },
    loadComponent: () =>
      import('./pages/policy-servicing.page').then(m => m.PolicyServicingPage)
  }
];
