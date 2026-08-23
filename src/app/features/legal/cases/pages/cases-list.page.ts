import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-cases-list-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Litigation, Arbitration & Bad-Faith Dispute Docket</h1>
          <p>Legal dispute management, coverage litigation, reservation of rights (ROR) defenses, and counsel oversight</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Open Legal Matter</button>
      </div>

      <app-data-grid
        title="Active Legal Disputes"
        [columnDefs]="columnDefs"
        [rowData]="cases()"
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
export class CasesListPage {
  cases = signal([
    { caseNumber: 'LIT-2026-041', title: 'Cascade Hospital Network v. Patient Estate', claimRef: 'CLM-US-2026-00432', courtJurisdiction: 'US District Court - Western WA', defenseFirm: 'Wilson Sonsini Goodrich & Rosati', status: 'ACTIVE_DISCOVERY' },
    { caseNumber: 'LIT-2026-042', title: 'Veridex Lloyd\'s Syndicate v. Carrier Transicold', claimRef: 'CLM-US-2026-00431', courtJurisdiction: 'Maritime Arbitration London (LMAA)', defenseFirm: 'Clifford Chance LLP', status: 'ARBITRATION_PENDING' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'caseNumber', headerName: 'Matter Ref #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'title', headerName: 'Case Caption & Style', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'claimRef', headerName: 'Underlying Claim', width: 170 },
    { field: 'courtJurisdiction', headerName: 'Forum / Venue', flex: 2, minWidth: 220 },
    { field: 'defenseFirm', headerName: 'Appointed Defense Counsel', width: 240 },
    { field: 'status', headerName: 'Matter Status', width: 180 }
  ];
}
