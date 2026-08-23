import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-recoveries-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Subrogation, Salvage & Third-Party Recoveries</h1>
          <p>Manage third-party tortfeasor subrogation actions, salvage auctions, and net loss offset recoveries</p>
        </div>
      </div>

      <app-data-grid
        title="Subrogation & Recovery Opportunities"
        [columnDefs]="columnDefs"
        [rowData]="recoveries()"
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
export class RecoveriesPage {
  recoveries = signal([
    { recId: 'SUBRO-2026-01', claimRef: 'CLM-US-2026-00431', targetParty: 'Carrier Reefer Manufacturer (Carrier Transicold)', recoveryDemand: '$45,200.00', status: 'DEMAND_LETTER_DISPATCHED', legalLead: 'Veridex Subrogation Counsel' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'recId', headerName: 'Subro Case #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'claimRef', headerName: 'Claim #', width: 170 },
    { field: 'targetParty', headerName: 'Adverse Tortfeasor / Third Party', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'recoveryDemand', headerName: 'Demand Amount', width: 160, cellStyle: { fontWeight: '700', color: 'var(--vx-success)' } },
    { field: 'status', headerName: 'Action State', width: 220 },
    { field: 'legalLead', headerName: 'Lead Counsel', width: 200 }
  ];
}
