import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog, DialogModule } from 'primeng/dialog';
import { PrimeTemplate, SharedModule } from 'primeng/api';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, Dialog, SharedModule, PrimeTemplate],
  template: `
    <p-dialog
      [visible]="isOpen"
      (visibleChange)="onVisibleChange($event)"
      [modal]="true"
      [style]="getModalWidth()"
      [dismissableMask]="closeOnBackdrop"
      [closable]="true"
      (onHide)="close()"
      [header]="title"
      [class]="'vx-prime-dialog modal-' + size"
    >
      <ng-template pTemplate="header" *ngIf="subtitle">
        <div class="vx-modal-title-group">
          <h3 class="vx-modal-title">{{ title }}</h3>
          <p class="vx-modal-subtitle">{{ subtitle }}</p>
        </div>
      </ng-template>

      <!-- Modal Body -->
      <div class="vx-modal-body">
        <ng-content></ng-content>
      </div>

      <!-- Modal Footer -->
      <ng-template pTemplate="footer" *ngIf="showFooter">
        <div class="vx-modal-footer">
          <ng-content select="[modalFooter]"></ng-content>
        </div>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .vx-modal-title-group {
      display: flex;
      flex-direction: column;
      .vx-modal-title { font-size: 15px; font-weight: 700; color: var(--vx-text-primary); }
      .vx-modal-subtitle { font-size: 12px; color: var(--vx-text-muted); margin-top: 2px; }
    }
    .vx-modal-body {
      padding: 10px 0;
    }
    .vx-modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      width: 100%;
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

  getModalWidth(): { width: string } {
    switch (this.size) {
      case 'sm': return { width: '420px' };
      case 'md': return { width: '600px' };
      case 'lg': return { width: '860px' };
      case 'xl': return { width: '1140px' };
      case 'full': return { width: '95vw' };
      default: return { width: '600px' };
    }
  }

  onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.close();
    }
  }

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.closed.emit();
  }
}
