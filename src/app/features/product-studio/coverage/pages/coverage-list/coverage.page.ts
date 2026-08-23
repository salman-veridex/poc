import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-coverage-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Coverage Library & Insuring Agreements</h1>
          <p>Standardized coverage clauses, aggregate limits, deductibles, and sub-limit conditions</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Define New Coverage</button>
      </div>

      <app-data-grid
        title="Active Insuring Clauses"
        [columnDefs]="columnDefs"
        [rowData]="coverages()"
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
export class CoveragePage {
  coverages = signal([
    { code: 'COV-BLD-01', name: 'Building & Real Property Direct Damage', type: 'PROPERTY', defaultLimit: '$10,000,000', deductible: '$25,000', mandatory: 'Yes' },
    { code: 'COV-BI-02', name: 'Business Income & Extra Expense (Actual Loss Sustained)', type: 'BUSINESS_INTERRUPTION', defaultLimit: '$2,500,000', deductible: '72 Hours', mandatory: 'Yes' },
    { code: 'COV-CYB-03', name: 'Ransomware Extortion & Negotiation Costs', type: 'CYBER', defaultLimit: '$5,000,000', deductible: '$50,000', mandatory: 'Optional' },
    { code: 'COV-EQ-04', name: 'Earthquake & Volcanic Eruption Sub-limit', type: 'NAT_CAT', defaultLimit: '$5,000,000', deductible: '5% Value', mandatory: 'Optional' },
    { code: 'COV-FLD-05', name: 'Special Flood Hazard Area (SFHA) Coverage', type: 'NAT_CAT', defaultLimit: '$2,000,000', deductible: '$100,000', mandatory: 'Optional' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'code', headerName: 'Coverage Code', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'name', headerName: 'Insuring Agreement Clause', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'type', headerName: 'Peril Category', width: 180 },
    { field: 'defaultLimit', headerName: 'Standard Limit', width: 160 },
    { field: 'deductible', headerName: 'Default Deductible', width: 160 },
    { field: 'mandatory', headerName: 'Mandatory', width: 110 }
  ];
}
