import { Routes } from '@angular/router';

export const UNDERWRITING_ROUTES: Routes = [
  {
    path: '',
    title: 'Underwriting Workbench | Veridex Quote & Underwriting',
    data: { breadcrumb: 'Underwriting Workbench' },
    loadComponent: () =>
      import('./pages/underwriting.page').then(m => m.UnderwritingPage)
  }
];
