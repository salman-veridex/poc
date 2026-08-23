import { Routes } from '@angular/router';

export const COMMUNICATIONS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'correspondence',
    pathMatch: 'full'
  },
  {
    path: 'correspondence',
    data: { breadcrumb: 'Communications' },
    loadChildren: () =>
      import('./correspondence/correspondence.routes').then(m => m.CORRESPONDENCE_ROUTES)
  },
  {
    path: 'notifications',
    data: { breadcrumb: 'Communications' },
    loadChildren: () =>
      import('./notifications/notifications.routes').then(m => m.COMM_NOTIFICATIONS_ROUTES)
  },
  {
    path: 'templates',
    data: { breadcrumb: 'Communications' },
    loadChildren: () =>
      import('./templates/templates.routes').then(m => m.COMM_TEMPLATES_ROUTES)
  }
];
