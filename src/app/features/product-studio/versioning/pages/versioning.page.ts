import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-versioning-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Product Line Versioning & Revision History</h1>
          <p>Audit rate revisions, effective date boundaries, regulatory filing versions, and rollback states</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Create Version Branch</button>
      </div>

      <app-data-grid
        title="Product Release Tree"
        [columnDefs]="columnDefs"
        [rowData]="versions()"
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
export class VersioningPage {
  versions = signal([
    { versionTag: 'v4.2.0-PROD', product: 'Enterprise Cyber Risk Shield', status: 'ACTIVE_DEPLOYED', effectiveFrom: '2026-01-01', createdBy: 'Alexander Vance', changes: 'Updated ransomware factor and added biometric MFA rule' },
    { versionTag: 'v4.3.0-RC1', product: 'Enterprise Cyber Risk Shield', status: 'IN_TESTING', effectiveFrom: '2026-09-01', createdBy: 'Sarah Jenkins', changes: 'AI hallucination coverage sub-limit extension' },
    { versionTag: 'v6.1.0-PROD', product: 'Commercial Real Estate Special Form', status: 'ACTIVE_DEPLOYED', effectiveFrom: '2025-11-01', createdBy: 'Marcus Sterling', changes: 'Updated coastal wind deductible tiers' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'versionTag', headerName: 'Version SemVer', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'product', headerName: 'Product', minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'status', headerName: 'Deployment Status', width: 170 },
    { field: 'effectiveFrom', headerName: 'Inception Date', width: 140 },
    { field: 'createdBy', headerName: 'Author', width: 160 },
    { field: 'changes', headerName: 'Changelog Summary', flex: 2, minWidth: 260 }
  ];
}
