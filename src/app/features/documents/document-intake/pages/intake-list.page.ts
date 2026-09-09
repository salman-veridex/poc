import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';
import { FileUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-intake-list-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent, FileUploadComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Document Intake & Smart Mailroom Inbox</h1>
          <p>Centralized ingestion of Loss Runs, ACORD Application PDFs, SOV spreadsheets, and Police Reports</p>
        </div>
      </div>

      <div class="vx-card p-3 mb-3">
        <h4 style="margin-bottom: 8px; font-size: 13px;">Quick Document Ingestion</h4>
        <app-file-upload helpText="Drag and drop ACORD forms, SOV Excel files, or Claim loss runs" />
      </div>

      <app-data-grid
        title="Ingested Documents Queue"
        [columnDefs]="columnDefs"
        [rowData]="documents()"
        gridHeight="480px"
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
    .p-3 { padding: 16px; }
    .mb-3 { margin-bottom: 8px; }
  `]
})
export class DocumentIntakePage {
  documents = signal([
    { docId: 'DOC-2026-9011', fileName: 'ACORD_130_Workers_Comp_Apex.pdf', source: 'BROKER_EMAIL_INTAKE', type: 'ACORD_APP', ocrStatus: 'EXTRACTED_100%', classifiedAs: 'Workers Comp Application', receivedAt: '2026-08-22 10:14' },
    { docId: 'DOC-2026-9012', fileName: 'SOV_Schedule_Of_Values_2026.xlsx', source: 'PORTAL_UPLOAD', type: 'SOV_SPREADSHEET', ocrStatus: 'PARSED_42_LOCATIONS', classifiedAs: 'Property Schedule of Values', receivedAt: '2026-08-22 09:45' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'docId', headerName: 'Document Ref', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'fileName', headerName: 'File Name', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'source', headerName: 'Ingestion Source', width: 180 },
    { field: 'classifiedAs', headerName: 'AI Classification', width: 220 },
    { field: 'ocrStatus', headerName: 'Extraction State', width: 190, cellStyle: { color: 'var(--vx-success)', fontWeight: '600' } },
    { field: 'receivedAt', headerName: 'Received At', width: 170 }
  ];
}
