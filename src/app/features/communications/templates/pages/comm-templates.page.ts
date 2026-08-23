import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-comm-templates-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Message & Email Templates</h1>
          <p>Standardized branded email layouts, SMS bodies, and broker quote offer covering letters</p>
        </div>
        <button class="btn btn-primary btn-sm">+ New Message Template</button>
      </div>

      <app-data-grid
        title="Message Templates"
        [columnDefs]="columnDefs"
        [rowData]="templates()"
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
export class CommTemplatesPage {
  templates = signal([
    { tplId: 'COMM-TPL-01', name: 'Commercial Quote Presentation Covering Email', channel: 'EMAIL', version: 'v2.1', status: 'ACTIVE' },
    { tplId: 'COMM-TPL-02', name: 'FNOL Claim Acknowledgment & Adjuster Assignment', channel: 'EMAIL + SMS', version: 'v1.3', status: 'ACTIVE' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'tplId', headerName: 'Template #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'name', headerName: 'Template Description', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'channel', headerName: 'Supported Channel', width: 180 },
    { field: 'version', headerName: 'Version', width: 120 },
    { field: 'status', headerName: 'Status', width: 140 }
  ];
}
