import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-commissions-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Broker Commissions & Producer Compensation</h1>
          <p>Standard schedule rates, contingent profit sharing, overrides, and monthly statement disbursement</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Execute Commission Run</button>
      </div>

      <app-data-grid
        title="Broker Commission Statements"
        [columnDefs]="columnDefs"
        [rowData]="commissions()"
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
export class CommissionsPage {
  commissions = signal([
    { stmtId: 'COM-2026-08-01', agency: 'Aon Commercial Risk Solutions', broker: 'James McAvoy', gwpBasis: '$345,000.00', commissionRate: '15.0%', payableAmount: '$51,750.00', status: 'DISBURSED_ACH' },
    { stmtId: 'COM-2026-08-02', agency: 'Marsh Specialty London', broker: 'Helena Lindqvist', gwpBasis: '$120,000.00', commissionRate: '12.5%', payableAmount: '$15,000.00', status: 'PENDING_APPROVAL' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'stmtId', headerName: 'Statement #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'agency', headerName: 'Brokerage / MGA Agency', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'broker', headerName: 'Producing Broker', width: 170 },
    { field: 'gwpBasis', headerName: 'GWP Premium Base', width: 170 },
    { field: 'commissionRate', headerName: 'Contract Rate', width: 130 },
    { field: 'payableAmount', headerName: 'Payable Amount', width: 160, cellStyle: { fontWeight: '700', color: 'var(--vx-brand-navy)' } },
    { field: 'status', headerName: 'Status', width: 180 }
  ];
}
