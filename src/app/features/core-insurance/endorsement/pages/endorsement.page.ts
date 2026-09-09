import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-endorsement-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Mid-Term Adjustments & Policy Endorsements (MTA)</h1>
          <p>Process AP/RP endorsements, additional insured additions, location modifications, and limit changes</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Initiate Policy Endorsement</button>
      </div>

      <app-data-grid
        title="Endorsement Ledger"
        [columnDefs]="columnDefs"
        [rowData]="endorsements()"
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
export class EndorsementPage {
  endorsements = signal([
    { endId: 'END-US-2026-11894', policyNumber: 'POL-US-2026-89423', insured: 'Cascade Hospital Network Inc', changeType: 'ADD_SURGICAL_CENTER_LOCATION', apRpAmount: '+$32,000 AP', effectiveDate: '2026-08-20', status: 'ISSUED' },
    { endId: 'END-US-2026-11895', policyNumber: 'POL-US-2026-89424', insured: 'Summit Peak Logistics LLC', changeType: 'SCHEDULED_VEHICLE_ADDITION (15 Trucks)', apRpAmount: '+$18,500 AP', effectiveDate: '2026-08-22', status: 'PENDING_UW_APPROVAL' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'endId', headerName: 'Endorsement #', width: 170, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'policyNumber', headerName: 'Parent Policy #', width: 170 },
    { field: 'insured', headerName: 'Insured Account', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'changeType', headerName: 'Endorsement Purpose', flex: 2, minWidth: 240 },
    { field: 'apRpAmount', headerName: 'AP / RP Premium', width: 160, cellStyle: { fontWeight: '700', color: 'var(--vx-brand-navy)' } },
    { field: 'effectiveDate', headerName: 'Effective Date', width: 130 },
    { field: 'status', headerName: 'Status', width: 180 }
  ];
}
