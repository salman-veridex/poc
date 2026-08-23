import { Routes } from '@angular/router';

export const CORE_INSURANCE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'policies',
    pathMatch: 'full'
  },
  {
    path: 'policies',
    data: { breadcrumb: 'Core Insurance' },
    loadChildren: () =>
      import('./policy/policy.routes').then(m => m.POLICY_ROUTES)
  },
  {
    path: 'issuance',
    data: { breadcrumb: 'Core Insurance' },
    loadChildren: () =>
      import('./issuance/issuance.routes').then(m => m.ISSUANCE_ROUTES)
  },
  {
    path: 'endorsements',
    data: { breadcrumb: 'Core Insurance' },
    loadChildren: () =>
      import('./endorsement/endorsement.routes').then(m => m.ENDORSEMENT_ROUTES)
  },
  {
    path: 'cancellation',
    data: { breadcrumb: 'Core Insurance' },
    loadChildren: () =>
      import('./cancellation/cancellation.routes').then(m => m.CANCELLATION_ROUTES)
  },
  {
    path: 'reinstatement',
    data: { breadcrumb: 'Core Insurance' },
    loadChildren: () =>
      import('./reinstatement/reinstatement.routes').then(m => m.REINSTATEMENT_ROUTES)
  },
  {
    path: 'renewal',
    data: { breadcrumb: 'Core Insurance' },
    loadChildren: () =>
      import('./renewal/renewal.routes').then(m => m.RENEWAL_ROUTES)
  },
  {
    path: 'policy-servicing',
    data: { breadcrumb: 'Core Insurance' },
    loadChildren: () =>
      import('./policy-servicing/policy-servicing.routes').then(m => m.POLICY_SERVICING_ROUTES)
  }
];
