import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-policy-servicing-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policyholder Servicing & Certificate Management (COI)</h1>
          <p>Generate ACORD Certificates of Insurance (COI), Loss Payee / Mortgagee updates, and policy inquiry requests</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Issue Certificate of Insurance (COI)</button>
      </div>

      <app-data-grid
        title="Active Policyholder Service Requests"
        [columnDefs]="columnDefs"
        [rowData]="requests()"
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
export class PolicyServicingPage {
  requests = signal([
    { reqId: 'SRV-2026-901', policyNumber: 'POL-US-2026-89421', insured: 'Nexus Renewable Energy Inc', requestType: 'ACORD 25 COI ISSUANCE', certificateHolder: 'Citigroup Project Financing LLC', status: 'GENERATED_SENT' },
    { reqId: 'SRV-2026-902', policyNumber: 'POL-US-2026-89423', insured: 'Cascade Hospital Network Inc', requestType: 'LOSS_PAYEE_ENDORSEMENT', certificateHolder: 'JPMorgan Equipment Leasing', status: 'IN_PROCESSING' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'reqId', headerName: 'Service Ticket #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'policyNumber', headerName: 'Policy Number', width: 170 },
    { field: 'insured', headerName: 'Insured Account', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'requestType', headerName: 'Service Request', width: 220 },
    { field: 'certificateHolder', headerName: 'Certificate Holder / Entity', flex: 2, minWidth: 240 },
    { field: 'status', headerName: 'Status', width: 170 }
  ];
}
