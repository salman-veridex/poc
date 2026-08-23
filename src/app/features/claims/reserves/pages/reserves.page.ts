import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-reserves-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Loss Reserves, Expense Reserves & Actuarial IBNR</h1>
          <p>Indemnity reserves, ALAE legal fee reserves, ULAE operational loads, and reserve change audit history</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Adjust Case Reserve</button>
      </div>

      <app-data-grid
        title="Case Reserves Register"
        [columnDefs]="columnDefs"
        [rowData]="reserves()"
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
export class ReservesPage {
  reserves = signal([
    { claimNum: 'CLM-US-2026-00432', exposure: 'BODILY_INJURY_INDEMNITY', priorReserve: '$150,000.00', currentReserve: '$250,000.00 (+$100k)', setBy: 'Robert Vance', reason: 'Surgeon Expert Deposition Escalation', updatedAt: '2026-08-20' },
    { claimNum: 'CLM-US-2026-00433', exposure: 'SOLAR_ARRAY_DAMAGE', priorReserve: '$0.00', currentReserve: '$120,000.00', setBy: 'Evelyn Reed', reason: 'Initial Field Adjuster Drone Inspection', updatedAt: '2026-08-19' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'claimNum', headerName: 'Claim #', width: 170, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'exposure', headerName: 'Exposure Bucket', width: 220 },
    { field: 'priorReserve', headerName: 'Prior Reserve', width: 150 },
    { field: 'currentReserve', headerName: 'Current Active Reserve', width: 210, cellStyle: { fontWeight: '700', color: 'var(--vx-brand-navy)' } },
    { field: 'setBy', headerName: 'Adjuster Author', width: 160 },
    { field: 'reason', headerName: 'Reserve Justification Memo', flex: 2, minWidth: 260 },
    { field: 'updatedAt', headerName: 'Date', width: 120 }
  ];
}
