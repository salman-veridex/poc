import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-cancellation-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policy Cancellation & Non-Renewal Governance</h1>
          <p>Manage Flat cancellations, Pro-Rata / Short-Rate returns, Non-Payment NOC notices, and statutory cooling periods</p>
        </div>
      </div>

      <app-data-grid
        title="Cancellation Register"
        [columnDefs]="columnDefs"
        [rowData]="cancellations()"
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
export class CancellationPage {
  cancellations = signal([
    { canId: 'CAN-2026-081', policyNumber: 'POL-US-2025-77120', insured: 'Heritage Logistics Warehouse', reason: 'NON_PAYMENT_PREMIUM', calcMethod: 'PRO_RATA', returnPremium: '-$14,200 RP', status: 'NOC_DISPATCHED_PENDING_EXPIRY' },
    { canId: 'CAN-2026-082', policyNumber: 'POL-US-2026-80411', insured: 'Metro Retail Properties', reason: 'INSURED_REQUEST_SOLD_BUILDING', calcMethod: 'SHORT_RATE', returnPremium: '-$8,500 RP', status: 'CANCELLED_CLOSED' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'canId', headerName: 'Notice #', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'policyNumber', headerName: 'Policy Number', width: 170 },
    { field: 'insured', headerName: 'Insured Account', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'reason', headerName: 'Cancellation Reason', width: 220 },
    { field: 'calcMethod', headerName: 'Method', width: 130 },
    { field: 'returnPremium', headerName: 'Return Premium', width: 150, cellStyle: { color: 'var(--vx-danger)', fontWeight: '700' } },
    { field: 'status', headerName: 'Status', width: 220 }
  ];
}
