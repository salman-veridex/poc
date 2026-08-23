import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    title: 'User Directory | Veridex Administration',
    data: { breadcrumb: 'Users' },
    loadComponent: () =>
      import('./pages/user-list.page').then(m => m.UserListPage)
  }
];
