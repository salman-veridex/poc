import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-ocr-workbench-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>AI Document Extraction & OCR Workbench</h1>
          <p>Optical character recognition, entity extraction, bounding box validation, and human-in-the-loop triage</p>
        </div>
      </div>

      <app-data-grid
        title="OCR Extraction Queue"
        [columnDefs]="columnDefs"
        [rowData]="extractions()"
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
export class OcrPage {
  extractions = signal([
    { ocrId: 'OCR-8821', file: 'Apex_Loss_Runs_5_Years.pdf', fieldsDetected: '142 / 142 Fields', confidenceScore: '99.2%', status: 'VERIFIED_AUTO', targetEntity: 'Submission SUB-8812' },
    { ocrId: 'OCR-8822', file: 'Police_Accident_Report_2026_099.pdf', fieldsDetected: '28 / 32 Fields', confidenceScore: '87.4%', status: 'NEEDS_HUMAN_REVIEW', targetEntity: 'Claim CLM-00431' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'ocrId', headerName: 'Extraction ID', width: 150, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'file', headerName: 'Source File', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'fieldsDetected', headerName: 'Extracted Fields', width: 170 },
    { field: 'confidenceScore', headerName: 'AI Confidence', width: 150, cellStyle: { fontWeight: '700' } },
    { field: 'status', headerName: 'Extraction State', width: 200 },
    { field: 'targetEntity', headerName: 'Linked PAS Entity', width: 200 }
  ];
}
