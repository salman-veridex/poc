import { Routes } from '@angular/router';

export const RISK_CONFIGURATION_ROUTES: Routes = [
  {
    path: '',
    title: 'Risk Configuration | Veridex Product Studio',
    data: { breadcrumb: 'Risk Configuration' },
    loadComponent: () =>
      import('./pages/risk-configuration.page').then(m => m.RiskConfigurationPage)
  }
];
