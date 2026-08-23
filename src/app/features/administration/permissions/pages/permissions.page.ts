import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-permissions-matrix-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Permission Matrix & Enterprise Feature Flags</h1>
          <p>Granular function permission grants across Underwriting, Rating, Claims, Policy 360, and Finance</p>
        </div>
      </div>
      <div class="vx-card p-4">
        <h3 style="font-size: 14px; font-weight: 700; color: var(--vx-brand-navy); margin-bottom: 8px;">Permission Matrix System</h3>
        <p style="font-size: 12.5px; color: var(--vx-text-secondary);">Strict capability tokens enforce UI button visibility (*hasPermission) and backend API route guards.</p>
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
export class PermissionsPage {}
