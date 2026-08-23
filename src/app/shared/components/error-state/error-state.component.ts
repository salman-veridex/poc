import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-error-state">
      <div class="vx-error-icon-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h3 class="vx-error-title">{{ title }}</h3>
      <p class="vx-error-desc">{{ message }}</p>
      @if (showRetry) {
        <button class="btn btn-secondary btn-sm" (click)="retryClicked.emit()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 13px; height: 13px;">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          <span>Retry Request</span>
        </button>
      }
    </div>
  `,
  styles: [`
    .vx-error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 48px 24px;
      gap: 12px;

      .vx-error-icon-circle {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #fee2e2;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--vx-danger);
        margin-bottom: 4px;

        svg { width: 28px; height: 28px; }
      }

      .vx-error-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--vx-danger);
      }

      .vx-error-desc {
        font-size: 12.5px;
        color: var(--vx-text-secondary);
        max-width: 440px;
        line-height: 1.5;
      }
    }
  `]
})
export class ErrorStateComponent {
  @Input() title = 'Service Operation Failed';
  @Input() message = 'An error occurred while connecting to the core insurance service.';
  @Input() showRetry = true;
  @Output() retryClicked = new EventEmitter<void>();
}
