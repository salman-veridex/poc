import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-classification-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Document Classification & Taxonomy Rules</h1>
          <p>Configure automated ML document classifiers, tag hierarchies, retention schedules, and indexing rules</p>
        </div>
      </div>

      <app-data-grid
        title="Document Taxonomy Categories"
        [columnDefs]="columnDefs"
        [rowData]="taxonomies()"
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
export class ClassificationPage {
  taxonomies = signal([
    { tag: 'DOC_ACORD_APPLICATION', name: 'ACORD Standard Application Form', retentionPeriod: '7 Years Post Policy Expiration', autoRouteTo: 'Submission Intake', encryption: 'AES-256' },
    { tag: 'DOC_CLAIM_POLICE_REPORT', name: 'Official First Responder Incident Report', retentionPeriod: '10 Years Post Claim Settlement', autoRouteTo: 'Claims Exposures', encryption: 'AES-256' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'tag', headerName: 'Taxonomy Tag', width: 220, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'name', headerName: 'Document Type', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'retentionPeriod', headerName: 'Statutory Retention', width: 240 },
    { field: 'autoRouteTo', headerName: 'Auto-Routing Target', width: 200 },
    { field: 'encryption', headerName: 'Storage Security', width: 140 }
  ];
}
