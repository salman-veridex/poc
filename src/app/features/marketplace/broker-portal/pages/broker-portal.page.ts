import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-broker-portal-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Digital Broker Portal & Producer Workbench</h1>
          <p>Direct broker self-service for quote indications, bind orders, commission statements, and endorsement requests</p>
        </div>
      </div>

      <app-data-grid
        title="Broker Book of Business"
        [columnDefs]="columnDefs"
        [rowData]="accounts()"
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
export class BrokerPortalPage {
  accounts = signal([
    { brokerAccount: 'BRK-AON-01', agency: 'Aon Commercial Risk', activeQuotes: 14, inForcePolicies: 68, ytdPremium: '$14,250,000.00', commissionEarned: '$2,137,500.00', status: 'ACTIVE_TIER_1' },
    { brokerAccount: 'BRK-MRSH-02', agency: 'Marsh Specialty London', activeQuotes: 9, inForcePolicies: 42, ytdPremium: '$9,800,000.00', commissionEarned: '$1,225,000.00', status: 'ACTIVE_TIER_1' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'brokerAccount', headerName: 'Producer ID', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'agency', headerName: 'Brokerage Name', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'activeQuotes', headerName: 'Active Quotes', width: 140 },
    { field: 'inForcePolicies', headerName: 'In-Force Book', width: 140 },
    { field: 'ytdPremium', headerName: 'YTD Written Premium', width: 190, cellStyle: { fontWeight: '700' } },
    { field: 'commissionEarned', headerName: 'YTD Commissions', width: 180 },
    { field: 'status', headerName: 'Partner Status', width: 160 }
  ];
}
