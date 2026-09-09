import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-issuance-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policy Document Issuance & Distribution Hub</h1>
          <p>Automated compilation of Declarations, Schedules, Endorsements, and statutory dispatch to brokers</p>
        </div>
      </div>

      <app-data-grid
        title="Issuance Processing Queue"
        [columnDefs]="columnDefs"
        [rowData]="issuances()"
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
export class IssuancePage {
  issuances = signal([
    { issueId: 'ISS-2026-4401', policyNumber: 'POL-US-2026-89421', insured: 'Nexus Renewable Energy Inc', packType: 'NEW_BUSINESS_PACKAGE', status: 'DISPATCHED_ELECTRONIC', dispatchedAt: '2026-08-15 10:15' },
    { issueId: 'ISS-2026-4402', policyNumber: 'POL-US-2026-89422', insured: 'Atlantic Maritime Logistics Ltd', packType: 'RENEWAL_DEC_PAGE', status: 'DELIVERED_BROKER_PORTAL', dispatchedAt: '2026-06-01 09:30' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'issueId', headerName: 'Issuance Batch #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'policyNumber', headerName: 'Policy Number', width: 170 },
    { field: 'insured', headerName: 'Insured Account', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'packType', headerName: 'Package Type', width: 220 },
    { field: 'status', headerName: 'Distribution State', width: 200 },
    { field: 'dispatchedAt', headerName: 'Dispatch Timestamp', width: 170 }
  ];
}
