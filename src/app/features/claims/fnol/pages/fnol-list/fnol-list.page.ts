import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ColDef, ICellRendererParams } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';
import { HasPermissionDirective } from '../../../../../shared/directives/has-permission.directive';
import { ClaimRecord } from '../../models/fnol.models';
import { FnolService } from '../../services/fnol.service';

@Component({
  selector: 'app-fnol-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DataGridComponent, HasPermissionDirective],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>First Notice of Loss (FNOL) & Claims Master Register</h1>
          <p>End-to-end claims lifecycle, coverage verification, reserves management, and settlement disbursements</p>
        </div>
        <button *hasPermission="'CLAIMS_CREATE'" routerLink="/claims/fnol/create" class="btn btn-primary btn-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Report New FNOL Loss</span>
        </button>
      </div>

      <app-data-grid
        title="Claims Adjudication Queue"
        [columnDefs]="columnDefs"
        [rowData]="claims()"
        [loading]="loading()"
        gridHeight="600px"
        (refreshClicked)="loadClaims()"
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
export class FnolListPage implements OnInit {
  private fnolService = inject(FnolService);
  private router = inject(Router);

  claims = signal<ClaimRecord[]>([]);
  loading = signal(true);

  columnDefs: ColDef<ClaimRecord>[] = [
    {
      field: 'claimNumber',
      headerName: 'Claim #',
      width: 170,
      cellStyle: { fontFamily: 'var(--vx-font-mono)', fontWeight: '700', color: 'var(--vx-brand-primary)' }
    },
    {
      field: 'policyNumber',
      headerName: 'Underlying Policy',
      width: 170
    },
    {
      field: 'insuredName',
      headerName: 'Named Insured',
      flex: 2,
      minWidth: 220,
      cellStyle: { fontWeight: '600' }
    },
    {
      field: 'perilType',
      headerName: 'Peril / Incident Description',
      flex: 2,
      minWidth: 240
    },
    {
      field: 'status',
      headerName: 'Claim Status',
      width: 160,
      cellRenderer: (params: ICellRendererParams) => {
        const val = params.value || 'FNOL_INTAKE';
        const color = val === 'PAID' ? 'badge-active' : (val === 'UNDER_INVESTIGATION' ? 'badge-warning' : 'badge-info');
        return `<span class="vx-status-badge ${color}"><span class="badge-dot"></span>${val.replace(/_/g, ' ')}</span>`;
      }
    },
    {
      field: 'totalReserve',
      headerName: 'Total Incurred Reserve',
      width: 170,
      type: 'numericColumn',
      valueFormatter: (p) => (p.value ? `$${Number(p.value).toLocaleString()}` : '$0.00'),
      cellStyle: { fontWeight: '700' }
    },
    {
      field: 'totalPaid',
      headerName: 'Disbursed Paid',
      width: 150,
      type: 'numericColumn',
      valueFormatter: (p) => (p.value ? `$${Number(p.value).toLocaleString()}` : '$0.00')
    },
    {
      field: 'lossDate',
      headerName: 'Date of Loss',
      width: 130
    },
    {
      field: 'leadAdjuster',
      headerName: 'Lead Adjuster',
      width: 160
    }
  ];

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.loading.set(true);
    this.fnolService.getClaims().subscribe(data => {
      this.claims.set(data);
      this.loading.set(false);
    });
  }
}
