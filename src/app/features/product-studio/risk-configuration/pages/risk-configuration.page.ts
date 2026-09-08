import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-risk-configuration-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Risk Characteristics & Appetite Configuration</h1>
          <p>Define risk classification schemas, territory codes, hazard indices, and underwriting thresholds</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Add Risk Characteristic</button>
      </div>

      <app-data-grid
        title="Configured Risk Attributes"
        [columnDefs]="columnDefs"
        [rowData]="risks()"
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
export class RiskConfigurationPage {
  risks = signal([
    { code: 'RSK-NAICS-CONSTR', category: 'Occupancy / Industry', name: 'Commercial Construction & Heavy Civil', riskTier: 'Tier 3 (High)', autoReferral: 'Enabled (> $2M)' },
    { code: 'RSK-WIND-TIER1', category: 'Catastrophe / Geography', name: 'Tier 1 Coastal Wind / Hurricane Zone', riskTier: 'Tier 4 (Cat)', autoReferral: 'Mandatory' },
    { code: 'RSK-CYB-HEALTH', category: 'Industry Segment', name: 'Healthcare & Hospital Patient Records', riskTier: 'Tier 3 (High)', autoReferral: 'Enabled (> 50k Records)' },
    { code: 'RSK-WAREHOUSE-AUTO', category: 'Occupancy / Fire', name: 'Automated High-Bay Storage Facility', riskTier: 'Tier 2 (Moderate)', autoReferral: 'Disabled' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'code', headerName: 'Attribute Key', width: 180, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'category', headerName: 'Category', width: 200 },
    { field: 'name', headerName: 'Risk Characteristic', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'riskTier', headerName: 'Assigned Hazard Tier', width: 180 },
    { field: 'autoReferral', headerName: 'Underwriting Referral Rule', width: 200 }
  ];
}
