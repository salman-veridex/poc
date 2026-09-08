import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-storage-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Enterprise Document Storage & Vault Archives</h1>
          <p>WORM-compliant (Write Once, Read Many) secure object repository for policy dockets, claims evidence, and audited files</p>
        </div>
      </div>

      <app-data-grid
        title="Archived Insurance Assets"
        [columnDefs]="columnDefs"
        [rowData]="archives()"
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
export class StoragePage {
  archives = signal([
    { vaultId: 'VLT-2026-001', entityRef: 'POL-US-2026-89421', fileCount: '18 Documents', totalSize: '42.8 MB', retentionExpires: '2033-08-15', storageTier: 'HOT_REDUNDANT' },
    { vaultId: 'VLT-2026-002', entityRef: 'CLM-US-2026-00431', fileCount: '34 Documents', totalSize: '128.5 MB', retentionExpires: '2036-12-31', storageTier: 'HOT_REDUNDANT' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'vaultId', headerName: 'Vault Docket #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'entityRef', headerName: 'Linked Policy / Claim', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'fileCount', headerName: 'Document Count', width: 160 },
    { field: 'totalSize', headerName: 'Archive Size', width: 140 },
    { field: 'retentionExpires', headerName: 'Statutory Expiry', width: 170 },
    { field: 'storageTier', headerName: 'Storage Tier', width: 180 }
  ];
}
