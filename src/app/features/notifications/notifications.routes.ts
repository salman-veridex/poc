import { Routes } from '@angular/router';

export const NOTIFICATIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Notifications | Veridex Insurance ERP',
    data: { breadcrumb: 'Notifications' },
    loadComponent: () =>
      import('./pages/notification-center.page').then(m => m.NotificationCenterPage)
  }
];
