import { Routes } from '@angular/router';

export const STORAGE_ROUTES: Routes = [
  {
    path: '',
    title: 'Document Storage | Veridex Documents',
    data: { breadcrumb: 'Storage' },
    loadComponent: () =>
      import('./pages/storage.page').then(m => m.StoragePage)
  }
];
