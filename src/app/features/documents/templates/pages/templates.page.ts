import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-templates-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Document Templates & Dynamic Correspondence Engine</h1>
          <p>Maintain DOCX/HTML/PDF templates with merge tokens, conditional clauses, and dynamic signature fields</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Upload Template</button>
      </div>

      <app-data-grid
        title="Document Templates"
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
export class TemplatesPage {
  templates = signal([
    { tplId: 'TPL-DEC-2026', name: 'Master Commercial Policy Declarations (Dec-Page)', engine: 'Docx-to-PDF / Handlebars', version: 'v3.2', status: 'ACTIVE_PROD' },
    { tplId: 'TPL-NOC-2026', name: 'Notice of Cancellation for Non-Payment (NOC)', engine: 'PDF Forms Fill Engine', version: 'v1.4', status: 'ACTIVE_PROD' },
    { tplId: 'TPL-COI-ACORD25', name: 'ACORD 25 Certificate of Liability Insurance', engine: 'Standardized ACORD XML/PDF', version: '2016/03', status: 'ACTIVE_PROD' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'tplId', headerName: 'Template ID', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'name', headerName: 'Template Name', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'engine', headerName: 'Generation Engine', width: 220 },
    { field: 'version', headerName: 'Version', width: 120 },
    { field: 'status', headerName: 'Status', width: 160 }
  ];
}
