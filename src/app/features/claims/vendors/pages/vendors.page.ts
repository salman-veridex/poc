import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-vendors-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Claims Vendors, Independent Adjusters & Forensic Experts</h1>
          <p>Manage approved paneled IA firms, drone inspection partners, forensic accountants, and defense legal panels</p>
        </div>
      </div>

      <app-data-grid
        title="Paneled Service Providers"
        [columnDefs]="columnDefs"
        [rowData]="vendors()"
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
export class VendorsPage {
  vendors = signal([
    { vendorId: 'VND-001', name: 'Crawford & Company (Global Loss Adjusters)', serviceType: 'Independent Adjuster (IA)', slaScore: '98.5%', status: 'APPROVED_PANEL' },
    { vendorId: 'VND-002', name: 'Mandiant Threat Intelligence & Forensics', serviceType: 'Cyber Forensics & Incident Response', slaScore: '99.9%', status: 'APPROVED_PANEL' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'vendorId', headerName: 'Vendor ID', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'name', headerName: 'Company Name', flex: 2, minWidth: 260, cellStyle: { fontWeight: '600' } },
    { field: 'serviceType', headerName: 'Specialty Area', width: 260 },
    { field: 'slaScore', headerName: 'SLA Performance', width: 160 },
    { field: 'status', headerName: 'Panel Status', width: 180 }
  ];
}
