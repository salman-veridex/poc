import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-rules-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Underwriting Rules & Rating Engine Matrix</h1>
          <p>Configure automated pricing formulas, referral criteria, eligibility rules, and binding constraints</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Define Underwriting Rule</button>
      </div>

      <app-data-grid
        title="Business & Pricing Rules Engine"
        [columnDefs]="columnDefs"
        [rowData]="rules()"
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
export class RulesPage {
  rules = signal([
    { code: 'RUL-ELIG-01', category: 'ELIGIBILITY', ruleName: 'Restricted Industry NAICS Exclusions', condition: 'NAICS in [Cannabis, Mining, Explosives]', action: 'DECLINE_HARD' },
    { code: 'RUL-UW-02', category: 'UNDERWRITING_AUTHORITY', ruleName: 'TIV Exposure Exceeds Underwriter Level 1', condition: 'TotalInsuredValue > $10,000,000', action: 'REFERRAL_TO_LEVEL_2' },
    { code: 'RUL-RATE-03', category: 'RATING_MULT', ruleName: 'ISO Construction Class 1 (Frame) Surcharge', condition: 'BuildingConstruction == "FRAME"', action: 'MULTIPLY_BASE_RATE(1.65)' },
    { code: 'RUL-BIND-04', category: 'BINDING_CONTROL', ruleName: 'Target Inception Date Retroactive Check', condition: 'EffectiveDate < Today() - 14 Days', action: 'BLOCK_DIRECT_BIND' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'code', headerName: 'Rule Code', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'category', headerName: 'Rule Type', width: 200 },
    { field: 'ruleName', headerName: 'Rule Description', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'condition', headerName: 'Evaluation Expression', flex: 2, minWidth: 240, cellStyle: { fontFamily: 'var(--vx-font-mono)', color: '#0f766e' } },
    { field: 'action', headerName: 'Engine Action', width: 220, cellStyle: { fontWeight: '600', color: 'var(--vx-brand-navy)' } }
  ];
}
