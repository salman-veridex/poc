import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-underwriting-workbench-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Underwriting Workbench & Risk Decisioning</h1>
          <p>Risk evaluation, subjective pricing credits/debits, capacity allocation, and binding authority controls</p>
        </div>
      </div>

      <app-data-grid
        title="Underwriting Queue"
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
export class UnderwritingPage {
  cases = signal([
    { ref: 'UW-2026-001', account: 'Atlantic Maritime Logistics Ltd', lob: 'Inland Marine', authorityNeeded: 'Level 3 ($5M Limit)', status: 'PENDING_DECISION', underwriter: 'Alexander Vance', riskGrade: 'A-' },
    { ref: 'UW-2026-002', account: 'Apex Industrial Properties Inc', lob: 'Commercial Property', authorityNeeded: 'Level 2 (Flood SFHA)', status: 'APPROVED_CONDITIONAL', underwriter: 'Alexander Vance', riskGrade: 'B+' },
    { ref: 'UW-2026-003', account: 'BioHealth Analytics Corp', lob: 'Cyber Risk', authorityNeeded: 'Level 1 (Standard)', status: 'IN_RATING', underwriter: 'Marcus Sterling', riskGrade: 'A+' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'ref', headerName: 'UW Case #', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'account', headerName: 'Account / Insured', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'lob', headerName: 'Line of Business', width: 180 },
    { field: 'authorityNeeded', headerName: 'Required Authority Level', width: 220 },
    { field: 'riskGrade', headerName: 'Risk Grade', width: 120 },
    { field: 'status', headerName: 'Workbench State', width: 180 },
    { field: 'underwriter', headerName: 'Lead Underwriter', width: 160 }
  ];
}
