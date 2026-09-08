import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-generation-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Asynchronous Document Generation Queue</h1>
          <p>Real-time telemetry for batch policy assembly, dec-page merges, loss runs, and billing notices</p>
        </div>
      </div>

      <app-data-grid
        title="Document Rendering Jobs"
        [columnDefs]="columnDefs"
        [rowData]="jobs()"
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
export class GenerationPage {
  jobs = signal([
    { jobId: 'JOB-2026-90412', docType: 'POLICY_PACKAGE_MERGE', targetId: 'POL-US-2026-89421', pageCount: 84, durationMs: '1,240ms', status: 'COMPLETED_SUCCESS' },
    { jobId: 'JOB-2026-90413', docType: 'MONTHLY_BILLING_RUN', targetId: 'BATCH_INV_AUG_2026', pageCount: 2450, durationMs: '14,800ms', status: 'COMPLETED_SUCCESS' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'jobId', headerName: 'Job ID', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'docType', headerName: 'Rendering Pipeline', width: 220 },
    { field: 'targetId', headerName: 'Target Entity / Batch', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'pageCount', headerName: 'Total Pages', width: 140 },
    { field: 'durationMs', headerName: 'Render Time', width: 150 },
    { field: 'status', headerName: 'State', width: 180 }
  ];
}
