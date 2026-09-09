import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ColDef, ICellRendererParams } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';
import { Quote } from '../../models/quote.models';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quotes-list-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Quote Ledger, Premium Pricing & Rate Breakdown</h1>
          <p>Review rating engine calculation outputs, premium schedules, endorsements, and broker quotation terms</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Execute Rating Engine</button>
      </div>

      <app-data-grid
        title="Quotation Register"
        [columnDefs]="columnDefs"
        [rowData]="quotes()"
        [loading]="loading()"
        gridHeight="600px"
        (refreshClicked)="loadQuotes()"
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
export class QuotesListPage implements OnInit {
  private quoteService = inject(QuoteService);

  quotes = signal<Quote[]>([]);
  loading = signal(true);

  columnDefs: ColDef<Quote>[] = [
    { field: 'quoteNumber', headerName: 'Quote Number', width: 150, cellStyle: { fontFamily: 'var(--vx-font-mono)', fontWeight: '700', color: 'var(--vx-brand-primary)' } },
    { field: 'insuredName', headerName: 'Insured Entity', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'productName', headerName: 'Product', minWidth: 220 },
    { field: 'totalPremium', headerName: 'Gross Premium', width: 150, type: 'numericColumn', valueFormatter: (p) => (p.value ? `$${Number(p.value).toLocaleString()}` : '$0.00') },
    { field: 'totalPayable', headerName: 'Total Payable (Inc. Tax)', width: 170, type: 'numericColumn', valueFormatter: (p) => (p.value ? `$${Number(p.value).toLocaleString()}` : '$0.00') },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      cellRenderer: (params: ICellRendererParams) => {
        const val = params.value || 'DRAFT';
        const color = val === 'BOUND' ? 'badge-active' : (val === 'OFFERED' ? 'badge-info' : 'badge-pending');
        return `<span class="vx-status-badge ${color}"><span class="badge-dot"></span>${val}</span>`;
      }
    },
    { field: 'effectiveDate', headerName: 'Inception Date', width: 130 },
    { field: 'underwriter', headerName: 'Underwriter', width: 160 }
  ];

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.loading.set(true);
    this.quoteService.getQuotes().subscribe(data => {
      this.quotes.set(data);
      this.loading.set(false);
    });
  }
}
