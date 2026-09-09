import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-forms-mapping-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policy Forms, Endorsements & Dec-Page Mapping</h1>
          <p>Map ISO, ACORD, and manuscript policy schedule forms to dynamic rating variables</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Upload Form Template</button>
      </div>

      <app-data-grid
        title="Attached Regulatory & Manuscript Forms"
        [columnDefs]="columnDefs"
        [rowData]="forms()"
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
export class FormsMappingPage {
  forms = signal([
    { formNumber: 'CP-00-10-10-12', edition: '10/12', title: 'Building and Personal Property Coverage Form', category: 'MANDATORY_BASE', attachedCount: 'All Property Quotes' },
    { formNumber: 'CP-10-30-10-12', edition: '10/12', title: 'Causes of Loss - Special Form (Exclusions & Limitations)', category: 'MANDATORY_PERIL', attachedCount: 'All Property Quotes' },
    { formNumber: 'IL-00-17-11-98', edition: '11/98', title: 'Common Policy Conditions', category: 'STATUTORY', attachedCount: 'All Issued Policies' },
    { formNumber: 'CYB-SEC-01-26', edition: '01/26', title: 'Veridex Manuscript Ransomware Sub-limit Endorsement', category: 'ENDORSEMENT', attachedCount: 'Cyber Risk LOB' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'formNumber', headerName: 'Form Identifier', width: 170, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'edition', headerName: 'Edition Date', width: 120 },
    { field: 'title', headerName: 'Policy Form Name', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'category', headerName: 'Form Classification', width: 180 },
    { field: 'attachedCount', headerName: 'Attachment Rule Target', width: 200 }
  ];
}
