import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-esignature-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>E-Signatures & Digital Execution Envelope Tracking</h1>
          <p>DocuSign / Adobe Sign / Native Veridex E-Sign integration for binders, warranties of no loss, and policy agreements</p>
        </div>
      </div>

      <app-data-grid
        title="Signing Envelopes"
        [columnDefs]="columnDefs"
        [rowData]="envelopes()"
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
export class EsignaturePage {
  envelopes = signal([
    { envId: 'ENV-2026-88120', documentName: 'Policy Binder & Statement of Values', recipient: 'Thomas Vance (CEO, Apex Industrial Dynamics)', status: 'SIGNED_COMPLETED', completedAt: '2026-08-22 15:45' },
    { envId: 'ENV-2026-88121', documentName: 'Warranty of No Known Loss', recipient: 'James McAvoy (Broker, Aon)', status: 'DELIVERED_PENDING_SIGNATURE', completedAt: 'Awaiting Signer' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'envId', headerName: 'Envelope #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'documentName', headerName: 'Envelope Package', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'recipient', headerName: 'Designated Signatory', flex: 2, minWidth: 240 },
    { field: 'status', headerName: 'Envelope Status', width: 220 },
    { field: 'completedAt', headerName: 'Completion Time', width: 170 }
  ];
}
