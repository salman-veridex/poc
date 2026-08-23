import { Routes } from '@angular/router';

export const AUDIT_ROUTES: Routes = [
  {
    path: '',
    title: 'Audit Logs | Veridex Administration',
    data: { breadcrumb: 'Audit' },
    loadComponent: () =>
      import('./pages/audit-logs.page').then(m => m.AuditLogsPage)
  }
];
