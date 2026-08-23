import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type StatusVariant =
  | 'active'
  | 'bound'
  | 'issued'
  | 'approved'
  | 'pending'
  | 'in-review'
  | 'submitted'
  | 'draft'
  | 'referred'
  | 'cancelled'
  | 'rejected'
  | 'closed'
  | 'expired'
  | 'info'
  | 'purple';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="vx-status-badge" [class]="'badge-' + getResolvedVariant()">
      <span class="badge-dot"></span>
      <span class="badge-text">{{ label || status }}</span>
    </span>
  `,
  styles: [`
    .vx-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
      border-radius: var(--vx-radius-full);
      line-height: 14px;
      letter-spacing: 0.02em;
      white-space: nowrap;

      .badge-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
      }

      /* Active / Bound / Issued / Success */
      &.badge-active, &.badge-bound, &.badge-issued, &.badge-approved, &.badge-success {
        background-color: #ecfdf5;
        color: #047857;
        border: 1px solid #a7f3d0;
        .badge-dot { background-color: #10b981; }
      }

      /* Pending / In-Review / Draft / Warning */
      &.badge-pending, &.badge-in-review, &.badge-submitted, &.badge-warning {
        background-color: #fffbeb;
        color: #b45309;
        border: 1px solid #fde68a;
        .badge-dot { background-color: #f59e0b; }
      }

      /* Referred / Attention */
      &.badge-referred, &.badge-purple {
        background-color: #f5f3ff;
        color: #6d28d9;
        border: 1px solid #ddd6fe;
        .badge-dot { background-color: #8b5cf6; }
      }

      /* Draft / Info */
      &.badge-draft, &.badge-info {
        background-color: #f0f9ff;
        color: #0369a1;
        border: 1px solid #bae6fd;
        .badge-dot { background-color: #0284c7; }
      }

      /* Cancelled / Rejected / Closed / Danger */
      &.badge-cancelled, &.badge-rejected, &.badge-closed, &.badge-expired, &.badge-danger {
        background-color: #fef2f2;
        color: #b91c1c;
        border: 1px solid #fecaca;
        .badge-dot { background-color: #ef4444; }
      }
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = 'active';
  @Input() label?: string;
  @Input() variant?: StatusVariant;

  getResolvedVariant(): string {
    if (this.variant) return this.variant;
    const normalized = (this.status || '').toLowerCase().replace(/_/g, '-');
    return normalized;
  }
}
