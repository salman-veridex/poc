import { Routes } from '@angular/router';

export const BINDING_ROUTES: Routes = [
  {
    path: '',
    title: 'Binding | Veridex Quote & Underwriting',
    data: { breadcrumb: 'Binding' },
    loadComponent: () =>
      import('./pages/binding.page').then(m => m.BindingPage)
  }
];
