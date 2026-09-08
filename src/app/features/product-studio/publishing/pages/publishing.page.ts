import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-publishing-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Product Studio Publishing & Environment Promotion</h1>
          <p>Promote tested product rating packages across Development, QA, UAT, and Production runtime engines</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Deploy New Release</button>
      </div>

      <app-data-grid
        title="Deployment Pipeline"
        [columnDefs]="columnDefs"
        [rowData]="releases()"
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
export class PublishingPage {
  releases = signal([
    { releaseId: 'REL-2026-08-01', product: 'Enterprise Cyber Risk Shield v4.2.0', targetEnv: 'PRODUCTION', status: 'ACTIVE_LIVE', syncStatus: '100% Synced (All Nodes)', deployedAt: '2026-08-01 02:00 UTC' },
    { releaseId: 'REL-2026-08-02', product: 'Fintech D&O Liability v1.2.0-RC', targetEnv: 'UAT_STAGING', status: 'READY_FOR_SIGNOFF', syncStatus: 'Broker Portal Validated', deployedAt: '2026-08-20 14:30 UTC' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'releaseId', headerName: 'Release ID', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'product', headerName: 'Product Package', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'targetEnv', headerName: 'Target Tier', width: 160 },
    { field: 'status', headerName: 'Status', width: 180 },
    { field: 'syncStatus', headerName: 'Cluster State', width: 200 },
    { field: 'deployedAt', headerName: 'Deployment Timestamp', width: 180 }
  ];
}
