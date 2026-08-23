import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-correspondence-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Customer & Broker Correspondence Hub</h1>
          <p>Outbound underwriting emails, policyholder inquiries, SMS notifications, and audit-stamped communications</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Compose Correspondence</button>
      </div>

      <app-data-grid
        title="Correspondence Log"
        [columnDefs]="columnDefs"
        [rowData]="items()"
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
export class CorrespondencePage {
  items = signal([
    { corrId: 'COR-2026-9901', channel: 'SECURE_EMAIL', recipient: 'james.mcavoy@aon.com', subject: 'Formal Quotation Terms: Apex Industrial Dynamics', linkedEntity: 'QT-2026-9041', status: 'DELIVERED_OPENED', sentAt: '2026-08-22 14:10' },
    { corrId: 'COR-2026-9902', channel: 'PORTAL_NOTIFICATION', recipient: 'Thomas Vance (Insured)', subject: 'Notice of Endorsement Issuance POL-89423', linkedEntity: 'END-US-11894', status: 'DELIVERED', sentAt: '2026-08-20 16:30' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'corrId', headerName: 'Message ID', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'channel', headerName: 'Communication Rail', width: 180 },
    { field: 'recipient', headerName: 'Recipient / Broker', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'subject', headerName: 'Subject Line', flex: 2, minWidth: 260 },
    { field: 'linkedEntity', headerName: 'Transaction Link', width: 170 },
    { field: 'status', headerName: 'Delivery Status', width: 180 },
    { field: 'sentAt', headerName: 'Sent Timestamp', width: 170 }
  ];
}
