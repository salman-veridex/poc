import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-binding-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policy Binding Order Workbench & Issuance Trigger</h1>
          <p>Execute firm order binding agreements, generate binder notices, and trigger Core Insurance PAS policy creation</p>
        </div>
      </div>

      <app-data-grid
        title="Ready-to-Bind Quotes"
        [columnDefs]="columnDefs"
        [rowData]="binders()"
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
export class BindingPage {
  binders = signal([
    { orderId: 'BND-2026-9901', quoteRef: 'QT-2026-9041', insured: 'Apex Industrial Dynamics LLC', gwp: '$148,912.50', inception: '2026-09-01', binderStatus: 'BINDER_ISSUED', policyStatus: 'PAS_QUEUED' },
    { orderId: 'BND-2026-9902', quoteRef: 'QT-2026-9043', insured: 'Evergreen Hospitality Group', gwp: '$334,400.00', inception: '2026-09-01', binderStatus: 'FIRM_ORDER_RECEIVED', policyStatus: 'READY_TO_GENERATE' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'orderId', headerName: 'Binding Order #', width: 160, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'quoteRef', headerName: 'Quote Reference', width: 150 },
    { field: 'insured', headerName: 'Insured Account', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'gwp', headerName: 'Bound GWP', width: 150, cellStyle: { fontWeight: '700' } },
    { field: 'inception', headerName: 'Effective Date', width: 130 },
    { field: 'binderStatus', headerName: 'Binder State', width: 180 },
    { field: 'policyStatus', headerName: 'Core PAS Status', width: 180 }
  ];
}
