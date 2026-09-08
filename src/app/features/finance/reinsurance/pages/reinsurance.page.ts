import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-reinsurance-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Reinsurance Treaties, Facultative Placement & Cessions</h1>
          <p>Manage Quota Share, Excess of Loss (XOL), Catastrophe Treaties, and automated premium/claims cessions</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Define Reinsurance Treaty</button>
      </div>

      <app-data-grid
        title="Active Reinsurance Treaties"
        [columnDefs]="columnDefs"
        [rowData]="treaties()"
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
export class ReinsurancePage {
  treaties = signal([
    { treatyCode: 'RI-QS-2026-PROP', name: 'Commercial Property Quota Share 40%', type: 'QUOTA_SHARE', reinsurers: 'Swiss Re (60%), Munich Re (40%)', cedingCommission: '28.5%', capacityLimit: '$50,000,000', status: 'ACTIVE_BOUND' },
    { treatyCode: 'RI-XOL-2026-CAT', name: 'Catastrophe Excess of Loss $25M xs $10M', type: 'EXCESS_OF_LOSS', reinsurers: 'Hannover Re, SCOR, Lloyd\'s', cedingCommission: 'N/A (Non-Proportional)', capacityLimit: '$25,000,000', status: 'ACTIVE_BOUND' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'treatyCode', headerName: 'Treaty Code', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'name', headerName: 'Treaty Program Name', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'type', headerName: 'Structure', width: 170 },
    { field: 'reinsurers', headerName: 'Reinsurance Panel', flex: 2, minWidth: 240 },
    { field: 'cedingCommission', headerName: 'Ceding Comm.', width: 160 },
    { field: 'capacityLimit', headerName: 'Treaty Capacity', width: 170, cellStyle: { fontWeight: '700' } },
    { field: 'status', headerName: 'Status', width: 160 }
  ];
}
