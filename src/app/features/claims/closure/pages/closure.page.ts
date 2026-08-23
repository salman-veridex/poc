import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-closure-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Claim File Closure & Final Release Governance</h1>
          <p>Formal claim closure sign-off, zero-reserve audits, release and indemnity waivers, and salvage closures</p>
        </div>
      </div>

      <app-data-grid
        title="Closed Claims Archive"
        [columnDefs]="columnDefs"
        [rowData]="closures()"
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
export class ClosurePage {
  closures = signal([
    { claimNum: 'CLM-US-2025-00109', insured: 'Heritage Logistics Warehouse', totalPaid: '$84,500.00', finalReserve: '$0.00', closedBy: 'Evelyn Reed', closeReason: 'SETTLED_FULL_RELEASE', closedDate: '2026-08-01' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'claimNum', headerName: 'Claim #', width: 170, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'insured', headerName: 'Insured Account', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'totalPaid', headerName: 'Total Incurred Loss', width: 170 },
    { field: 'finalReserve', headerName: 'Ending Reserve', width: 140 },
    { field: 'closedBy', headerName: 'Closure Sign-off', width: 160 },
    { field: 'closeReason', headerName: 'Closure Disposition', width: 220 },
    { field: 'closedDate', headerName: 'Closed Date', width: 130 }
  ];
}
