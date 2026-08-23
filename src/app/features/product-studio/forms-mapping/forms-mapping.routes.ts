import { Routes } from '@angular/router';

export const FORMS_MAPPING_ROUTES: Routes = [
  {
    path: '',
    title: 'Forms Mapping | Veridex Product Studio',
    data: { breadcrumb: 'Forms Mapping' },
    loadComponent: () =>
      import('./pages/forms-mapping.page').then(m => m.FormsMappingPage)
  }
];
