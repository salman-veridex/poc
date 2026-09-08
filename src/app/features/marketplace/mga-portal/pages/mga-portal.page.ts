import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-mga-portal-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Managing General Agent (MGA) Program Delegations</h1>
          <p>Bespoke delegated underwriting authorities (DUA), bordereaux submission audits, and program limits</p>
        </div>
      </div>

      <app-data-grid
        title="MGA Program Facilities"
        [columnDefs]="columnDefs"
        [rowData]="programs()"
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
export class MgaPortalPage {
  programs = signal([
    { programCode: 'MGA-CYB-LONDON', mgaName: 'Cortex Underwriting MGA Ltd', delegatedLine: '$10M Per Risk', lossRatioCap: '55.0%', bordereauxState: 'JULY_2026_RECONCILED', status: 'ACTIVE_DELEGATED' },
    { programCode: 'MGA-MAR-SING', mgaName: 'Pacifica Marine Underwriters Pte', delegatedLine: '$15M Per Vessel', lossRatioCap: '60.0%', bordereauxState: 'JULY_2026_RECONCILED', status: 'ACTIVE_DELEGATED' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'programCode', headerName: 'Program Code', width: 170, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'mgaName', headerName: 'MGA Partner Entity', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'delegatedLine', headerName: 'Delegated Authority Limit', width: 220 },
    { field: 'lossRatioCap', headerName: 'Target Loss Cap', width: 160 },
    { field: 'bordereauxState', headerName: 'Bordereaux Audit', width: 220 },
    { field: 'status', headerName: 'Status', width: 170 }
  ];
}
