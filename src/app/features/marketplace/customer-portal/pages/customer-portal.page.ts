import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-portal-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Policyholder Digital Self-Service Portal</h1>
          <p>Customer facing views for digital dec-pages, premium payments, certificate generation, and fast FNOL loss reporting</p>
        </div>
      </div>
      <div class="vx-card p-4">
        <h3 style="font-size: 14px; font-weight: 700; color: var(--vx-brand-navy); margin-bottom: 8px;">Customer Portal Self-Service Engine</h3>
        <p style="font-size: 12.5px; color: var(--vx-text-secondary);">Provides responsive, zero-friction policy servicing for commercial & specialty insureds.</p>
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
    .p-4 { padding: 20px; }
  `]
})
export class CustomerPortalPage {}
