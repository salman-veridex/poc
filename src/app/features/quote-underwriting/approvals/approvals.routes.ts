import { Routes } from '@angular/router';

export const APPROVALS_ROUTES: Routes = [
  {
    path: '',
    title: 'Approvals | Veridex Quote & Underwriting',
    data: { breadcrumb: 'Approvals' },
    loadComponent: () =>
      import('./pages/approvals.page').then(m => m.ApprovalsPage)
  }
];
