import { Routes } from '@angular/router';

export const MGA_PORTAL_ROUTES: Routes = [
  {
    path: '',
    title: 'MGA Portal | Veridex Marketplace',
    data: { breadcrumb: 'MGA Portal' },
    loadComponent: () =>
      import('./pages/mga-portal.page').then(m => m.MgaPortalPage)
  }
];
