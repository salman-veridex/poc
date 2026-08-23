import { Routes } from '@angular/router';

export const E_SIGNATURE_ROUTES: Routes = [
  {
    path: '',
    title: 'E-Signature | Veridex Documents',
    data: { breadcrumb: 'E-Signature' },
    loadComponent: () =>
      import('./pages/esignature.page').then(m => m.EsignaturePage)
  }
];
