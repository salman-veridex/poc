import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-carrier-portal-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Carrier & Fronting Syndicate Management Portal</h1>
          <p>Fronting carrier agreements, collateral trust accounts, statutory reporting, and reinsurance cession ledgers</p>
        </div>
      </div>
      <div class="vx-card p-4">
        <h3 style="font-size: 14px; font-weight: 700; color: var(--vx-brand-navy); margin-bottom: 8px;">Carrier Fronting Network</h3>
        <p style="font-size: 12.5px; color: var(--vx-text-secondary);">Participating fronting carriers: State National, Clear Blue, Accredited Surety, Lloyd's of London.</p>
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
export class CarrierPortalPage {}
