import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-comm-notifications-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Automated Notification Dispatch & Webhooks</h1>
          <p>Configured system notifications for billing reminders, policy cancellations, claims status, and SLA warnings</p>
        </div>
      </div>

      <app-data-grid
        title="Outbound Notifications"
        [columnDefs]="columnDefs"
        [rowData]="notifications()"
        gridHeight="560px"
      />
    </div>
  `,
  styles: [`
    .vx-page-container { display: flex; flex-direction: column; gap: 16px; }
    .vx-page-header {
      display: flex; align-items: center; justify-content: space-between;
      h1 { font-size: 18px; font-weight: 700; color: var(--vx-brand-navy); }
      p { font-size: 12px; color: var(--vx-text-muted); }
    }
  `]
})
export class CommNotificationsPage {
  notifications = signal([
    { notifId: 'NTF-2026-001', type: 'BILLING_PAYMENT_DUE', targetUser: 'accounts@apexindustrial.com', channel: 'EMAIL + SMS', status: 'SENT', sentAt: '2026-08-20 08:00' },
    { notifId: 'NTF-2026-002', type: 'RENEWAL_90_DAY_NOTICE', targetUser: 'rachel.green@gallagher.com', channel: 'PORTAL_EVENT', status: 'SENT', sentAt: '2026-08-15 08:00' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'notifId', headerName: 'Alert ID', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'type', headerName: 'Notification Trigger', width: 220 },
    { field: 'targetUser', headerName: 'Target Recipient', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'channel', headerName: 'Transport Rails', width: 180 },
    { field: 'status', headerName: 'Status', width: 140 },
    { field: 'sentAt', headerName: 'Dispatched At', width: 170 }
  ];
}
