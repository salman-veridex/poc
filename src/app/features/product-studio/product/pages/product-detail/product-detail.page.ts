import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { CurrencyFormatPipe } from '../../../../../shared/pipes/currency-format.pipe';
import { InsuranceProduct } from '../../models/product.models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, CurrencyFormatPipe],
  template: `
    @if (product(); as p) {
      <div class="vx-product-detail-container">
        <!-- Header -->
        <div class="vx-page-header">
          <div class="vx-page-title-group">
            <div class="title-row">
              <h1>{{ p.name }}</h1>
              <span class="product-code">{{ p.code }}</span>
              <app-status-badge [status]="p.status" />
            </div>
            <p>Version {{ p.version }} • Effective from {{ p.effectiveDate }} • Managed by {{ p.updatedBy }}</p>
          </div>
          <div class="vx-page-actions">
            <a routerLink="/product-studio/products" class="btn btn-secondary btn-sm">&larr; Back to Catalog</a>
            <button class="btn btn-primary btn-sm">Edit Product Specification</button>
          </div>
        </div>

        <!-- Metric Highlight Cards -->
        <div class="grid-cols-4">
          <div class="vx-card p-3">
            <span class="label-muted">Line of Business</span>
            <strong class="val-text">{{ p.lineOfBusiness.replace('_', ' ') }}</strong>
          </div>
          <div class="vx-card p-3">
            <span class="label-muted">In-Force Policies</span>
            <strong class="val-text">{{ p.activePoliciesCount | number }}</strong>
          </div>
          <div class="vx-card p-3">
            <span class="label-muted">Annual GWP Portfolio</span>
            <strong class="val-text">{{ p.annualGWP | currencyFormat }}</strong>
          </div>
          <div class="vx-card p-3">
            <span class="label-muted">Configured Coverages</span>
            <strong class="val-text">{{ p.coveragesCount }} Modules</strong>
          </div>
        </div>

        <!-- Description Card -->
        <div class="vx-card mt-4">
          <div class="vx-card-header">
            <h3 class="vx-card-title">Underwriting Appetite & Target Risk Profile</h3>
          </div>
          <div class="vx-card-body">
            <p class="desc-text">{{ p.description }}</p>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .vx-product-detail-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: 10px;
      h1 { font-size: 18px; font-weight: 700; color: var(--vx-brand-navy); }
      .product-code {
        font-family: var(--vx-font-mono);
        font-size: 12px;
        background: #f1f5f9;
        padding: 2px 8px;
        border-radius: 4px;
        color: var(--vx-brand-primary);
        font-weight: 700;
      }
    }
    .p-3 { padding: 14px; }
    .mt-4 { margin-top: 16px; }
    .label-muted { font-size: 11px; color: var(--vx-text-muted); display: block; margin-bottom: 4px; }
    .val-text { font-size: 16px; font-weight: 700; color: var(--vx-text-primary); }
    .desc-text { font-size: 13px; color: var(--vx-text-secondary); line-height: 1.6; }
  `]
})
export class ProductDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product = signal<InsuranceProduct | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || 'prd_cyber_enterprise_2026';
    this.productService.getProductById(id).subscribe(p => this.product.set(p));
  }
}
