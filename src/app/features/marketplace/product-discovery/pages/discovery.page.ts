import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-discovery-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Digital Insurance Marketplace & Product Discovery</h1>
          <p>Explore commercial products, syndicate capacity lines, instant quotation appetites, and embedded APIs</p>
        </div>
      </div>

      <div class="vx-marketplace-grid">
        @for (item of products(); track item.id) {
          <div class="vx-card vx-product-card">
            <div class="product-badge">{{ item.category }}</div>
            <h3 class="product-title">{{ item.name }}</h3>
            <p class="product-desc">{{ item.description }}</p>
            <div class="product-features">
              @for (feat of item.features; track feat) {
                <span class="feat-tag">✓ {{ feat }}</span>
              }
            </div>
            <div class="product-card-footer">
              <div class="capacity-info">
                <span class="cap-label">Max Line Capacity</span>
                <span class="cap-val">{{ item.maxCapacity }}</span>
              </div>
              <a routerLink="/quote-underwriting/submissions" class="btn btn-primary btn-sm">Instant Quote &rarr;</a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .vx-page-container { display: flex; flex-direction: column; gap: 16px; }
    .vx-page-header {
      display: flex; align-items: center; justify-content: space-between;
      h1 { font-size: 18px; font-weight: 700; color: var(--vx-brand-navy); }
      p { font-size: 12px; color: var(--vx-text-muted); }
    }
    .vx-marketplace-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;
    }
    .vx-product-card {
      padding: 18px; display: flex; flex-direction: column; gap: 10px;
      .product-badge {
        font-size: 10.5px; font-weight: 700; color: var(--vx-brand-primary);
        background-color: var(--vx-brand-primary-light); padding: 2px 8px;
        border-radius: var(--vx-radius-sm); align-self: flex-start;
      }
      .product-title { font-size: 14px; font-weight: 700; color: var(--vx-brand-navy); }
      .product-desc { font-size: 12px; color: var(--vx-text-secondary); line-height: 1.5; flex: 1; }
      .product-features {
        display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0;
        .feat-tag { font-size: 11px; color: var(--vx-success); background-color: #ecfdf5; padding: 2px 6px; border-radius: 4px; }
      }
      .product-card-footer {
        display: flex; align-items: center; justify-content: space-between;
        padding-top: 12px; border-top: 1px solid var(--vx-border-subtle);
        .capacity-info {
          display: flex; flex-direction: column;
          .cap-label { font-size: 10.5px; color: var(--vx-text-muted); }
          .cap-val { font-size: 13px; font-weight: 700; color: var(--vx-brand-navy); }
        }
      }
    }
  `]
})
export class ProductDiscoveryPage {
  products = signal([
    {
      id: 'mp_01',
      category: 'CYBER & TECH LIABILITY',
      name: 'Veridex Ransomware & Cyber Risk Shield',
      description: 'Comprehensive cyber risk protection for modern enterprises with live threat feeds and instant API rating.',
      features: ['Up to $25M Capacity', 'Instant Triage API', 'Forensic Extraction Included'],
      maxCapacity: '$25,000,000'
    },
    {
      id: 'mp_02',
      category: 'COMMERCIAL PROPERTY',
      name: 'Commercial Real Estate Special All-Risk',
      description: 'Building, personal property, and business interruption coverages with automatic flood and quake tiers.',
      features: ['Up to $50M Capacity', 'Tiered Deductibles', 'ACORD Auto-Mapping'],
      maxCapacity: '$50,000,000'
    },
    {
      id: 'mp_03',
      category: 'LOGISTICS & INLAND MARINE',
      name: 'Global Supply Chain & Cargo Floater',
      description: 'Intermodal transit protection for freight forwarders, motor carriers, and high-value cargo dockets.',
      features: ['Reefer Breakdown', 'Warehouse-to-Warehouse', 'Direct Bind Authority'],
      maxCapacity: '$15,000,000'
    }
  ]);
}
