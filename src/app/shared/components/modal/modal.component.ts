import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="vx-modal-backdrop" (click)="onBackdropClick($event)">
        <div class="vx-modal-dialog" [class]="'modal-' + size" role="dialog" aria-modal="true">
          <!-- Modal Header -->
          <div class="vx-modal-header">
            <div class="vx-modal-title-group">
              <h3 class="vx-modal-title">{{ title }}</h3>
              @if (subtitle) {
                <p class="vx-modal-subtitle">{{ subtitle }}</p>
              }
            </div>
            <button class="vx-modal-close-btn" (click)="close()" title="Close dialog">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="vx-modal-body">
            <ng-content></ng-content>
          </div>

          <!-- Modal Footer -->
          @if (showFooter) {
            <div class="vx-modal-footer">
              <ng-content select="[modalFooter]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .vx-modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(9, 30, 66, 0.54);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
      animation: backdropFadeIn 0.15s ease-out;
    }

    .vx-modal-dialog {
      background-color: #ffffff;
      border-radius: var(--vx-radius-lg);
      box-shadow: var(--vx-shadow-lg);
      width: 100%;
      max-height: calc(100vh - 48px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: modalSlideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1);

      &.modal-sm { max-width: 420px; }
      &.modal-md { max-width: 600px; }
      &.modal-lg { max-width: 860px; }
      &.modal-xl { max-width: 1140px; }
      &.modal-full { max-width: calc(100vw - 48px); height: calc(100vh - 48px); }
    }

    .vx-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-bottom: 1px solid var(--vx-border-subtle);
      background-color: #ffffff;

      .vx-modal-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--vx-text-primary);
      }

      .vx-modal-subtitle {
        font-size: 12px;
        color: var(--vx-text-muted);
        margin-top: 2px;
      }

      .vx-modal-close-btn {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        border-radius: var(--vx-radius-sm);
        cursor: pointer;
        color: var(--vx-text-muted);

        svg { width: 16px; height: 16px; }

        &:hover {
          background-color: var(--vx-bg-hover);
          color: var(--vx-text-primary);
        }
      }
    }

    .vx-modal-body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }

    .vx-modal-footer {
      padding: 12px 20px;
      border-top: 1px solid var(--vx-border-subtle);
      background-color: var(--vx-bg-subtle);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    @keyframes backdropFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes modalSlideUp {
      from { opacity: 0; transform: translateY(12px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() closeOnBackdrop = true;
  @Input() showFooter = true;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && (event.target as HTMLElement).classList.contains('vx-modal-backdrop')) {
      this.close();
    }
  }
}
