import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-renewal-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policy Renewals Pipeline & Auto-Renewal Automation</h1>
          <p>Manage expiring books of business (90/60/30 day notices), automatic re-rating, loss ratio checks, and renewal quote offers</p>
        </div>
      </div>

      <app-data-grid
        title="Upcoming Expirations & Renewals"
        [columnDefs]="columnDefs"
        [rowData]="renewals()"
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
export class RenewalPage {
  renewals = signal([
    { expiringPolicy: 'POL-US-2025-66100', insured: 'Metro Pacific Transit LLC', expDate: '2026-09-30 (38 Days)', expiringGWP: '$240,000', proposedRenewalGWP: '$258,000 (+7.5%)', lossRatio: '42.1%', renewalStage: 'RENEWAL_OFFER_DISPATCHED' },
    { expiringPolicy: 'POL-US-2025-66101', insured: 'Quantum BioLabs Inc', expDate: '2026-10-15 (53 Days)', expiringGWP: '$92,000', proposedRenewalGWP: '$96,500 (+4.8%)', lossRatio: '18.4%', renewalStage: 'AUTO_RATED_READY_TO_OFFER' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'expiringPolicy', headerName: 'Expiring Policy #', width: 170, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'insured', headerName: 'Insured Account', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'expDate', headerName: 'Expiration Date', width: 180 },
    { field: 'expiringGWP', headerName: 'Expiring GWP', width: 150 },
    { field: 'proposedRenewalGWP', headerName: 'Proposed Renewal GWP', width: 190, cellStyle: { fontWeight: '700' } },
    { field: 'lossRatio', headerName: 'Historical Loss Ratio', width: 170 },
    { field: 'renewalStage', headerName: 'Renewal Pipeline Stage', width: 220 }
  ];
}
