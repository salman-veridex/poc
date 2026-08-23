import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-empty-state">
      <div class="vx-empty-icon-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="12" r="10"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      </div>
      <h3 class="vx-empty-title">{{ title }}</h3>
      <p class="vx-empty-desc">{{ message }}</p>
      @if (actionLabel) {
        <button class="btn btn-primary btn-sm" (click)="actionClicked.emit()">
          {{ actionLabel }}
        </button>
      }
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .vx-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 48px 24px;
      gap: 12px;

      .vx-empty-icon-circle {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: var(--vx-bg-app);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        margin-bottom: 4px;

        svg { width: 28px; height: 28px; }
      }

      .vx-empty-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--vx-text-primary);
      }

      .vx-empty-desc {
        font-size: 12.5px;
        color: var(--vx-text-muted);
        max-width: 420px;
        line-height: 1.5;
      }
    }
  `]
})
export class EmptyStateComponent {
  @Input() title = 'No records found';
  @Input() message = 'There are no active records in this view.';
  @Input() actionLabel?: string;
  @Output() actionClicked = new EventEmitter<void>();
}
