import { Routes } from '@angular/router';

export const DOCUMENT_INTAKE_ROUTES: Routes = [
  {
    path: '',
    title: 'Document Intake | Veridex Documents',
    data: { breadcrumb: 'Document Intake' },
    loadComponent: () =>
      import('./pages/intake-list.page').then(m => m.DocumentIntakePage)
  }
];
