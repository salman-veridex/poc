import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Tag, TagModule } from 'primeng/tag';

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
  imports: [CommonModule, TagModule, Tag],
  template: `
    <p-tag
      [value]="label || status"
      [severity]="getPrimeSeverity()"
      [rounded]="true"
      [class]="'vx-status-tag tag-' + getResolvedVariant()"
    ></p-tag>
  `,
  styles: [`
    :host { display: inline-block; }
    ::ng-deep .vx-status-tag {
      font-size: 11px !important;
      font-weight: 600 !important;
      padding: 2px 10px !important;
      text-transform: capitalize;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = 'active';
  @Input() label?: string;
  @Input() variant?: StatusVariant;

  getResolvedVariant(): string {
    if (this.variant) return this.variant;
    return (this.status || '').toLowerCase().replace(/_/g, '-');
  }

  getPrimeSeverity(): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    const v = this.getResolvedVariant();
    if (['active', 'bound', 'issued', 'approved', 'success'].includes(v)) return 'success';
    if (['pending', 'in-review', 'submitted', 'warning'].includes(v)) return 'warn';
    if (['draft', 'info'].includes(v)) return 'info';
    if (['cancelled', 'rejected', 'closed', 'expired', 'danger'].includes(v)) return 'danger';
    if (['referred', 'purple'].includes(v)) return 'secondary';
    return undefined;
  }
}
