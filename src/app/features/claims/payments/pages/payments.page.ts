import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-claim-payments-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Claims Indemnity & Expense Disbursements</h1>
          <p>Direct electronic claim payments, vendor invoices, partial settlements, and final release executions</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Issue Claim Payment</button>
      </div>

      <app-data-grid
        title="Claims Payment Register"
        [columnDefs]="columnDefs"
        [rowData]="payments()"
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
export class ClaimPaymentsPage {
  payments = signal([
    { pmtId: 'CLM-PMT-9901', claimNum: 'CLM-US-2026-00431', payee: 'Atlantic Maritime Logistics Ltd', type: 'INDEMNITY_SETTLEMENT', amount: '$45,200.00', checkWire: 'ACH-DIRECT-SETTLE', status: 'DISBURSED_CLEARED', issuedAt: '2026-08-16' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'pmtId', headerName: 'Disbursement #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'claimNum', headerName: 'Claim #', width: 170 },
    { field: 'payee', headerName: 'Designated Payee', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'type', headerName: 'Payment Category', width: 200 },
    { field: 'amount', headerName: 'Disbursed Amount', width: 160, cellStyle: { fontWeight: '700', color: 'var(--vx-brand-navy)' } },
    { field: 'checkWire', headerName: 'Rail', width: 170 },
    { field: 'status', headerName: 'Status', width: 180 },
    { field: 'issuedAt', headerName: 'Payment Date', width: 130 }
  ];
}
