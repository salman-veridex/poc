import { Routes } from '@angular/router';

export const FNOL_ROUTES: Routes = [
  {
    path: '',
    title: 'FNOL Claims | Veridex Claims',
    data: { breadcrumb: 'FNOL' },
    loadComponent: () =>
      import('./pages/fnol-list/fnol-list.page').then(m => m.FnolListPage)
  },
  {
    path: 'create',
    title: 'Report FNOL Loss | Veridex Claims',
    data: { breadcrumb: 'Report Claim' },
    loadComponent: () =>
      import('./pages/fnol-create/fnol-create.page').then(m => m.FnolCreatePage)
  }
];
