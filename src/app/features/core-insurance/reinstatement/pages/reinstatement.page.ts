import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-reinstatement-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policy Reinstatements & Rescission Orders</h1>
          <p>Process reinstatement with/without lapse in coverage, warrant of no loss collections, and premium curing</p>
        </div>
      </div>

      <app-data-grid
        title="Reinstatement Requests"
        [columnDefs]="columnDefs"
        [rowData]="reinstatements()"
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
export class ReinstatementPage {
  reinstatements = signal([
    { rstId: 'RST-2026-021', policyNumber: 'POL-US-2025-77120', insured: 'Heritage Logistics Warehouse', condition: 'WARRANTY_OF_NO_KNOWN_LOSS_SIGNED', premiumCured: '$14,200.00 Received', lapsePeriod: 'No Lapse (Continuous)', status: 'REINSTATED_ACTIVE' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'rstId', headerName: 'Order #', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'policyNumber', headerName: 'Policy Number', width: 170 },
    { field: 'insured', headerName: 'Insured Account', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'condition', headerName: 'Underwriting Prerequisite', flex: 2, minWidth: 240 },
    { field: 'premiumCured', headerName: 'Payment Status', width: 180 },
    { field: 'lapsePeriod', headerName: 'Lapse Assessment', width: 180 },
    { field: 'status', headerName: 'Status', width: 180 }
  ];
}
