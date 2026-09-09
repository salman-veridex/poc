import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-accounting-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>General Ledger & Statutory Accounting (SAP / GAAP)</h1>
          <p>Unearned Premium Reserves (UPR), Incurred But Not Reported (IBNR), and journal entry audit streams</p>
        </div>
      </div>

      <app-data-grid
        title="GL Journal Entries"
        [columnDefs]="columnDefs"
        [rowData]="entries()"
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
export class AccountingPage {
  entries = signal([
    { entryId: 'GL-2026-9901', accountCode: '4010-00 (Gross Written Premium)', debit: '$0.00', credit: '$185,000.00', memo: 'Policy Binding POL-89421', timestamp: '2026-08-15' },
    { entryId: 'GL-2026-9902', accountCode: '1100-00 (Cash & Settlement Clearing)', debit: '$185,000.00', credit: '$0.00', memo: 'Direct Bill Wire Settlement', timestamp: '2026-08-15' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'entryId', headerName: 'Journal Ref #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'accountCode', headerName: 'General Ledger Account', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'debit', headerName: 'Debit ($)', width: 160, cellStyle: { fontWeight: '700' } },
    { field: 'credit', headerName: 'Credit ($)', width: 160, cellStyle: { fontWeight: '700' } },
    { field: 'memo', headerName: 'Transaction Memo', flex: 2, minWidth: 220 },
    { field: 'timestamp', headerName: 'Posting Date', width: 130 }
  ];
}
