import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-loading-container" [class.is-inline]="inline" [class.is-fullscreen]="fullscreen">
      <div class="vx-spinner" [class]="'size-' + size"></div>
      @if (message) {
        <span class="vx-loading-msg">{{ message }}</span>
      }
    </div>
  `,
  styles: [`
    .vx-loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 24px;
      color: var(--vx-text-secondary);

      &.is-inline {
        display: inline-flex;
        flex-direction: row;
        padding: 0;
      }

      &.is-fullscreen {
        position: fixed;
        inset: 0;
        background-color: rgba(255, 255, 255, 0.85);
        z-index: 999;
      }
    }

    .vx-spinner {
      border: 3px solid rgba(0, 82, 204, 0.15);
      border-top-color: var(--vx-brand-primary);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;

      &.size-sm { width: 16px; height: 16px; border-width: 2px; }
      &.size-md { width: 28px; height: 28px; border-width: 3px; }
      &.size-lg { width: 44px; height: 44px; border-width: 4px; }
    }

    .vx-loading-msg {
      font-size: 12px;
      font-weight: 500;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message = 'Loading...';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() inline = false;
  @Input() fullscreen = false;
}
