import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-approvals-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Underwriting Authority & Quotation Approvals</h1>
          <p>Formal dual-sign off authorization queue for binding quotes, pricing credits, and treaty limits</p>
        </div>
      </div>

      <app-data-grid
        title="Pending Sign-Off Approvals"
        [columnDefs]="columnDefs"
        [rowData]="approvals()"
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
export class ApprovalsPage {
  approvals = signal([
    { approvalId: 'APP-2026-041', targetQuote: 'QT-2026-9041', account: 'Apex Industrial Dynamics LLC', creditRequested: '-12.5% Discretionary UW Credit', approver: 'Alexander Vance (CUO Delegated)', status: 'APPROVED' },
    { approvalId: 'APP-2026-042', targetQuote: 'QT-2026-9045', account: 'Pacific Rim Energy Corp', creditRequested: 'Reinsurance Fac Limit $20M', approver: 'Senior Underwriting Committee', status: 'PENDING_SIGNOFF' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'approvalId', headerName: 'Approval #', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'targetQuote', headerName: 'Quotation Ref', width: 150 },
    { field: 'account', headerName: 'Account Name', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'creditRequested', headerName: 'Requested Exception / Credit', flex: 2, minWidth: 240 },
    { field: 'approver', headerName: 'Designated Approver', width: 220 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];
}
