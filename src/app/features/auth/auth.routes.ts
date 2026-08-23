import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Sign In | Veridex Insurance ERP',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  }
];
