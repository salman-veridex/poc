import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, ProgressSpinner],
  template: `
    <div class="vx-loading-container" [class.is-inline]="inline" [class.is-fullscreen]="fullscreen">
      <p-progress-spinner
        [style]="getSpinnerStyle()"
        strokeWidth="4"
        fill="transparent"
        animationDuration=".8s"
      ></p-progress-spinner>
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

    .vx-loading-msg {
      font-size: 12px;
      font-weight: 500;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message = 'Loading...';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() inline = false;
  @Input() fullscreen = false;

  getSpinnerStyle() {
    const dims = this.size === 'sm' ? '20px' : (this.size === 'lg' ? '48px' : '32px');
    return { width: dims, height: dims };
  }
}
