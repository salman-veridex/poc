import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-orgs-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Organizations, Syndicates & Multi-Tenant Entities</h1>
          <p>Configure underwriting legal entities, managing syndicates, MGA partner organizations, and regional branches</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Add Organization / Tenant</button>
      </div>

      <app-data-grid
        title="Multi-Tenant Insurance Entities"
        [columnDefs]="columnDefs"
        [rowData]="orgs()"
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
export class OrgsPage {
  orgs = signal([
    { tenantId: 'tnt_us_east_primary', name: 'Veridex Global Underwriters', type: 'PRIMARY_CARRIER', region: 'North America (US-East)', currency: 'USD ($)', status: 'ACTIVE_PROD' },
    { tenantId: 'tnt_uk_london_market', name: 'Veridex Lloyd\'s Syndicate 1948', type: 'LLOYDS_SYNDICATE', region: 'Europe (London)', currency: 'GBP (£) / EUR (€)', status: 'ACTIVE_PROD' },
    { tenantId: 'tnt_apac_singapore', name: 'Veridex APAC Reinsurance Hub', type: 'REINSURANCE_ENTITY', region: 'Asia-Pacific (Singapore)', currency: 'USD ($) / SGD ($)', status: 'ACTIVE_PROD' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'tenantId', headerName: 'Tenant Identifier', width: 220, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'name', headerName: 'Legal Entity Name', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'type', headerName: 'Entity Structure', width: 200 },
    { field: 'region', headerName: 'Operating Region', width: 220 },
    { field: 'currency', headerName: 'Base Currencies', width: 170 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];
}
