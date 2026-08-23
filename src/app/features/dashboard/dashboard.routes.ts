import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    title: 'Executive Dashboard | Veridex Insurance ERP',
    data: { breadcrumb: 'Executive Dashboard' },
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard.page').then(m => m.DashboardPage)
  }
];
