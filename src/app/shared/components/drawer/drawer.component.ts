import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="vx-drawer-backdrop" (click)="onBackdropClick($event)">
        <div class="vx-drawer-panel" [class]="'drawer-' + size" role="dialog">
          <!-- Drawer Header -->
          <div class="vx-drawer-header">
            <div class="vx-drawer-title-group">
              <h3 class="vx-drawer-title">{{ title }}</h3>
              @if (subtitle) {
                <p class="vx-drawer-subtitle">{{ subtitle }}</p>
              }
            </div>
            <button class="vx-drawer-close-btn" (click)="close()" title="Close side panel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Drawer Body -->
          <div class="vx-drawer-body">
            <ng-content></ng-content>
          </div>

          <!-- Drawer Footer -->
          @if (showFooter) {
            <div class="vx-drawer-footer">
              <ng-content select="[drawerFooter]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .vx-drawer-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(9, 30, 66, 0.45);
      backdrop-filter: blur(1.5px);
      z-index: 1000;
      display: flex;
      justify-content: flex-end;
      animation: backdropFade 0.2s ease-out;
    }

    .vx-drawer-panel {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      box-shadow: var(--vx-shadow-drawer);
      display: flex;
      flex-direction: column;
      animation: slideInRight 0.22s cubic-bezier(0.16, 1, 0.3, 1);

      &.drawer-sm { max-width: 380px; }
      &.drawer-md { max-width: 520px; }
      &.drawer-lg { max-width: 720px; }
      &.drawer-xl { max-width: 960px; }
    }

    .vx-drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 22px;
      border-bottom: 1px solid var(--vx-border-subtle);
      background-color: #ffffff;

      .vx-drawer-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--vx-text-primary);
      }

      .vx-drawer-subtitle {
        font-size: 12px;
        color: var(--vx-text-muted);
        margin-top: 2px;
      }

      .vx-drawer-close-btn {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        border-radius: var(--vx-radius-sm);
        cursor: pointer;
        color: var(--vx-text-muted);

        svg { width: 17px; height: 17px; }

        &:hover {
          background-color: var(--vx-bg-hover);
          color: var(--vx-text-primary);
        }
      }
    }

    .vx-drawer-body {
      flex: 1;
      padding: 22px;
      overflow-y: auto;
    }

    .vx-drawer-footer {
      padding: 14px 22px;
      border-top: 1px solid var(--vx-border-subtle);
      background-color: var(--vx-bg-subtle);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    @keyframes backdropFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
  `]
})
export class DrawerComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showFooter = true;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('vx-drawer-backdrop')) {
      this.close();
    }
  }
}
