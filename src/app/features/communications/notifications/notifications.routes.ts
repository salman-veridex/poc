import { Routes } from '@angular/router';

export const COMM_NOTIFICATIONS_ROUTES: Routes = [
  {
    path: '',
    title: 'Outbound Notifications | Veridex Communications',
    data: { breadcrumb: 'Notifications' },
    loadComponent: () =>
      import('./pages/notifications.page').then(m => m.CommNotificationsPage)
  }
];
