import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-coverage-verification-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Claims Coverage Verification & Policy Inception Check</h1>
          <p>Automated evaluation of loss date vs policy term, premium payment status, deductible application, and exclusion flags</p>
        </div>
      </div>

      <app-data-grid
        title="Coverage Verification Queue"
        [columnDefs]="columnDefs"
        [rowData]="items()"
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
export class CoverageVerificationPage {
  items = signal([
    { claimRef: 'CLM-US-2026-00433', policyNumber: 'POL-US-2026-89421', lossDate: '2026-08-18', policyTerm: '2026-08-15 to 2027-08-15', inForceCheck: 'PASSED (Day 4 of Term)', applicableDeductible: '$25,000 Wind/Hail', status: 'VERIFIED_ACTIVE' },
    { claimRef: 'CLM-US-2026-00432', policyNumber: 'POL-US-2026-89423', lossDate: '2026-07-28', policyTerm: '2026-04-10 to 2027-04-10', inForceCheck: 'PASSED (Term In-Force)', applicableDeductible: '$50,000 SIR', status: 'VERIFIED_ACTIVE' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'claimRef', headerName: 'Claim #', width: 170, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'policyNumber', headerName: 'Policy Number', width: 170 },
    { field: 'lossDate', headerName: 'Date of Loss', width: 130 },
    { field: 'policyTerm', headerName: 'Policy Effective Window', width: 220 },
    { field: 'inForceCheck', headerName: 'Coverage Check', flex: 2, minWidth: 200, cellStyle: { color: 'var(--vx-success)', fontWeight: '600' } },
    { field: 'applicableDeductible', headerName: 'Applicable Deductible', width: 180 },
    { field: 'status', headerName: 'Status', width: 160 }
  ];
}
