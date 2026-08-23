import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-reconciliation-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Bank & Payment Rail Reconciliation Hub</h1>
          <p>Automated match engine between bank MT940/BAI2 statements, credit card settlements, and ERP ledger accounts</p>
        </div>
      </div>

      <app-data-grid
        title="Reconciliation Batches"
        [columnDefs]="columnDefs"
        [rowData]="batches()"
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
export class ReconciliationPage {
  batches = signal([
    { batchId: 'REC-2026-08-22', bankAccount: 'JPMorgan Chase (Operating Master)', statementTotal: '$1,480,250.00', matchedAmount: '$1,480,250.00', variance: '$0.00', status: '100% BALANCED' },
    { batchId: 'REC-2026-08-21', bankAccount: 'Barclays London (Syndicate Trust)', statementTotal: '£850,000.00', matchedAmount: '£842,000.00', variance: '£8,000.00 (In-Transit)', status: 'VARIANCE_INVESTIGATION' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'batchId', headerName: 'Batch #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'bankAccount', headerName: 'Bank Account / Treasury Entity', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'statementTotal', headerName: 'Bank Total', width: 170 },
    { field: 'matchedAmount', headerName: 'Matched Ledger', width: 170 },
    { field: 'variance', headerName: 'Variance Delta', width: 180, cellStyle: { color: 'var(--vx-warning)', fontWeight: '600' } },
    { field: 'status', headerName: 'Reconciliation State', width: 220 }
  ];
}
