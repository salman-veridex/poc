import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-exposures-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Claim Exposures & Sub-Claim Feature Ledger</h1>
          <p>Breakdown of parent claims into discrete exposure units: Building Damage, Contents, Business Interruption, Bodily Injury, Legal Defense</p>
        </div>
      </div>

      <app-data-grid
        title="Active Claim Exposures"
        [columnDefs]="columnDefs"
        [rowData]="exposures()"
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
export class ExposuresPage {
  exposures = signal([
    { expId: 'EXP-431-01', parentClaim: 'CLM-US-2026-00431', claimant: 'Atlantic Maritime Logistics Ltd', exposureType: 'CARGO_PHYSICAL_DAMAGE', allocatedReserve: '$45,000.00', status: 'PAID_CLOSED' },
    { expId: 'EXP-431-02', parentClaim: 'CLM-US-2026-00431', claimant: 'Port of Newark Reefer Terminal', exposureType: 'STORAGE_DEMURRAGE_EXPENSE', allocatedReserve: '$20,000.00', status: 'IN_ADJUDICATION' },
    { expId: 'EXP-432-01', parentClaim: 'CLM-US-2026-00432', claimant: 'Patient Estate Legal Counsel', exposureType: 'BODILY_INJURY_INDEMNITY', allocatedReserve: '$250,000.00', status: 'OPEN_LITIGATION' },
    { expId: 'EXP-432-02', parentClaim: 'CLM-US-2026-00432', claimant: 'Wilson Sonsini Defense Counsel', exposureType: 'ALLOCATED_LOSS_ADJUSTMENT (ALAE)', allocatedReserve: '$100,000.00', status: 'LEGAL_RETAINER_ACTIVE' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'expId', headerName: 'Exposure ID', width: 150, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'parentClaim', headerName: 'Parent Claim #', width: 170 },
    { field: 'claimant', headerName: 'Claimant Entity', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'exposureType', headerName: 'Exposure Coverage Type', width: 220 },
    { field: 'allocatedReserve', headerName: 'Allocated Reserve', width: 160, cellStyle: { fontWeight: '700' } },
    { field: 'status', headerName: 'Status', width: 180 }
  ];
}
