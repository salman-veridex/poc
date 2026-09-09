import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ColDef, ICellRendererParams } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';
import { PolicySchedule } from '../../models/policy.models';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-policy-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policy 360 & Core Policy Administration (PAS)</h1>
          <p>In-force policy master ledger, endorsements, premium billings, dec-pages, and servicing records</p>
        </div>
        <button routerLink="/quote-underwriting/binding" class="btn btn-primary btn-sm">+ Issue Policy from Binder</button>
      </div>

      <app-data-grid
        title="Policy Master Register"
        subtitle="Double-click any policy to enter Policy 360 lifecycle details"
        [columnDefs]="columnDefs"
        [rowData]="policies()"
        [loading]="loading()"
        gridHeight="600px"
        (rowDoubleClicked)="onRowDoubleClicked($event)"
        (refreshClicked)="loadPolicies()"
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
export class PolicyListPage implements OnInit {
  private policyService = inject(PolicyService);
  private router = inject(Router);

  policies = signal<PolicySchedule[]>([]);
  loading = signal(true);

  columnDefs: ColDef<PolicySchedule>[] = [
    {
      field: 'policyNumber',
      headerName: 'Policy Number',
      width: 170,
      cellStyle: { fontFamily: 'var(--vx-font-mono)', fontWeight: '700', color: 'var(--vx-brand-primary)' }
    },
    {
      field: 'insuredName',
      headerName: 'Named Insured',
      flex: 2,
      minWidth: 240,
      cellStyle: { fontWeight: '600' }
    },
    {
      field: 'productName',
      headerName: 'Product',
      minWidth: 220
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      cellRenderer: (params: ICellRendererParams) => {
        const val = params.value || 'ACTIVE';
        const color = val === 'ACTIVE' ? 'badge-active' : (val === 'ENDORSEMENT_PENDING' ? 'badge-referred' : 'badge-danger');
        return `<span class="vx-status-badge ${color}"><span class="badge-dot"></span>${val.replace(/_/g, ' ')}</span>`;
      }
    },
    {
      field: 'annualPremium',
      headerName: 'Annual Premium',
      width: 160,
      type: 'numericColumn',
      valueFormatter: (p) => (p.value ? `$${Number(p.value).toLocaleString()}` : '$0.00')
    },
    {
      field: 'totalInsuredValue',
      headerName: 'Total Insured (TIV)',
      width: 170,
      type: 'numericColumn',
      valueFormatter: (p) => (p.value ? `$${(Number(p.value) / 1000000).toFixed(2)}M` : '$0.00')
    },
    {
      field: 'effectiveDate',
      headerName: 'Effective Date',
      width: 130
    },
    {
      field: 'expirationDate',
      headerName: 'Expiration Date',
      width: 130
    },
    {
      field: 'issuingSyndicate',
      headerName: 'Issuing Entity',
      width: 200
    }
  ];

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.loading.set(true);
    this.policyService.getPolicies().subscribe(data => {
      this.policies.set(data);
      this.loading.set(false);
    });
  }

  onRowDoubleClicked(policy: PolicySchedule): void {
    this.router.navigate(['/core-insurance/policies', policy.policyNumber]);
  }
}
