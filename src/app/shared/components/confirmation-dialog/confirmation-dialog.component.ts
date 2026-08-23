import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="vx-dialog-backdrop">
        <div class="vx-dialog-box" role="alertdialog">
          <div class="vx-dialog-icon-wrapper" [class]="'variant-' + variant">
            @switch (variant) {
              @case ('danger') {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              }
              @case ('warning') {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              }
              @default {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              }
            }
          </div>

          <div class="vx-dialog-body">
            <h3 class="vx-dialog-title">{{ title }}</h3>
            <p class="vx-dialog-message">{{ message }}</p>
          </div>

          <div class="vx-dialog-actions">
            <button type="button" class="btn btn-secondary btn-sm" (click)="cancel()">
              {{ cancelText }}
            </button>
            <button
              type="button"
              class="btn btn-sm"
              [class.btn-danger]="variant === 'danger'"
              [class.btn-primary]="variant !== 'danger'"
              (click)="confirm()">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .vx-dialog-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(9, 30, 66, 0.5);
      backdrop-filter: blur(2px);
      z-index: 1100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .vx-dialog-box {
      background: #ffffff;
      border-radius: var(--vx-radius-lg);
      box-shadow: var(--vx-shadow-lg);
      width: 100%;
      max-width: 440px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      animation: popIn 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .vx-dialog-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;

      svg { width: 24px; height: 24px; }

      &.variant-danger {
        background-color: #fee2e2;
        color: var(--vx-danger);
      }
      &.variant-warning {
        background-color: #fef3c7;
        color: var(--vx-warning);
      }
      &.variant-info {
        background-color: #e0f2fe;
        color: var(--vx-info);
      }
    }

    .vx-dialog-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--vx-text-primary);
      margin-bottom: 8px;
    }

    .vx-dialog-message {
      font-size: 12.5px;
      color: var(--vx-text-secondary);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .vx-dialog-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      justify-content: flex-end;
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class ConfirmationDialogComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed with this operation?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() variant: 'danger' | 'warning' | 'info' = 'danger';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm(): void {
    this.isOpen = false;
    this.confirmed.emit();
  }

  cancel(): void {
    this.isOpen = false;
    this.cancelled.emit();
  }
}
