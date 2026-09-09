import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ColDef, ICellRendererParams } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';
import { Invoice } from '../../models/billing.models';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-billing-list-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policyholder Billing & Premium Invoicing Ledger</h1>
          <p>Direct-bill & Agency-bill instalment schedules, automated dunning notices, and receivables ledger</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Generate Billing Run</button>
      </div>

      <app-data-grid
        title="Accounts Receivable & Invoices"
        [columnDefs]="columnDefs"
        [rowData]="invoices()"
        [loading]="loading()"
        gridHeight="600px"
        (refreshClicked)="loadInvoices()"
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
export class BillingListPage implements OnInit {
  private billingService = inject(BillingService);

  invoices = signal<Invoice[]>([]);
  loading = signal(true);

  columnDefs: ColDef<Invoice>[] = [
    { field: 'invoiceNumber', headerName: 'Invoice #', width: 160, cellStyle: { fontFamily: 'var(--vx-font-mono)', fontWeight: '700', color: 'var(--vx-brand-primary)' } },
    { field: 'policyNumber', headerName: 'Policy Number', width: 170 },
    { field: 'insuredName', headerName: 'Named Insured', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'billingType', headerName: 'Billing Channel', width: 150 },
    { field: 'installmentNumber', headerName: 'Instalment', width: 140 },
    { field: 'dueDate', headerName: 'Payment Due', width: 130 },
    { field: 'amountDue', headerName: 'Amount Due', width: 150, type: 'numericColumn', valueFormatter: (p) => (p.value ? `$${Number(p.value).toLocaleString()}` : '$0.00') },
    { field: 'amountPaid', headerName: 'Amount Paid', width: 150, type: 'numericColumn', valueFormatter: (p) => (p.value ? `$${Number(p.value).toLocaleString()}` : '$0.00') },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      cellRenderer: (params: ICellRendererParams) => {
        const val = params.value || 'DUE';
        const color = val === 'PAID' ? 'badge-active' : (val === 'OVERDUE' ? 'badge-danger' : 'badge-pending');
        return `<span class="vx-status-badge ${color}"><span class="badge-dot"></span>${val}</span>`;
      }
    }
  ];

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.loading.set(true);
    this.billingService.getInvoices().subscribe(data => {
      this.invoices.set(data);
      this.loading.set(false);
    });
  }
}
