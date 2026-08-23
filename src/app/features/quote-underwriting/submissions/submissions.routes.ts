import { Routes } from '@angular/router';

export const SUBMISSIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Submissions | Veridex Quote & Underwriting',
    data: { breadcrumb: 'Submissions' },
    loadComponent: () =>
      import('./pages/submissions-list/submissions-list.page').then(m => m.SubmissionsListPage)
  }
];
