import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Payments & Collections Processing</h1>
          <p>ACH/Wire settlements, Lockbox reconciliation, Credit Card gateways, and return premium disbursements</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Record Manual Payment</button>
      </div>

      <app-data-grid
        title="Payment Transactions Ledger"
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
export class PaymentsPage {
  payments = signal([
    { pmtId: 'PMT-2026-8801', invoiceNum: 'INV-2026-00912', insured: 'Nexus Renewable Energy Inc', method: 'FED_WIRE', amount: '$46,250.00', status: 'SETTLED', timestamp: '2026-08-20 11:20' },
    { pmtId: 'PMT-2026-8802', invoiceNum: 'INV-2026-00899', insured: 'BioHealth Analytics Corp', method: 'ACH_DIRECT_DEBIT', amount: '$22,000.00', status: 'SETTLED', timestamp: '2026-08-19 14:45' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'pmtId', headerName: 'Payment Ref #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'invoiceNum', headerName: 'Matched Invoice', width: 170 },
    { field: 'insured', headerName: 'Remitting Insured', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'method', headerName: 'Settlement Rail', width: 170 },
    { field: 'amount', headerName: 'Settled Amount', width: 160, cellStyle: { fontWeight: '700' } },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'timestamp', headerName: 'Settlement Time', width: 170 }
  ];
}
