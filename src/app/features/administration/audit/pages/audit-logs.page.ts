import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-audit-logs-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Enterprise Audit Trail & Immutable Transaction Log</h1>
          <p>Complete historical telemetry of all underwriting modifications, rating executions, binder issuances, and claim payments</p>
        </div>
      </div>

      <app-data-grid
        title="Security & Transaction Audit Logs"
        [columnDefs]="columnDefs"
        [rowData]="logs()"
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
export class AuditLogsPage {
  logs = signal([
    { logId: 'AUD-89210', user: 'alexander.vance@veridex.insurance', action: 'BIND_POLICY', targetRef: 'POL-US-2026-89421', ipAddress: '192.168.1.104', timestamp: '2026-08-22 14:15:22' },
    { logId: 'AUD-89211', user: 'sarah.jenkins@veridex.insurance', action: 'ADJUST_RATING_FACTOR', targetRef: 'PRD-CYB-001 v4.2.0', ipAddress: '192.168.1.189', timestamp: '2026-08-22 11:30:10' },
    { logId: 'AUD-89212', user: 'evelyn.reed@veridex.insurance', action: 'DISBURSE_CLAIM_PAYMENT', targetRef: 'CLM-US-2026-00431 ($45.2k)', ipAddress: '192.168.1.202', timestamp: '2026-08-22 09:42:01' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'logId', headerName: 'Audit ID', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'user', headerName: 'Executing Identity', width: 240, cellStyle: { fontWeight: '600' } },
    { field: 'action', headerName: 'ERP Operation', width: 220, cellStyle: { fontWeight: '700', color: 'var(--vx-brand-navy)' } },
    { field: 'targetRef', headerName: 'Target Entity / Record', flex: 2, minWidth: 240 },
    { field: 'ipAddress', headerName: 'Client IP', width: 150, cellStyle: { fontFamily: 'var(--vx-font-mono)' } },
    { field: 'timestamp', headerName: 'Timestamp (UTC)', width: 180 }
  ];
}
