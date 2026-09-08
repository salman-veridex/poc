import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { PrimeTemplate, SharedModule } from 'primeng/api';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, DrawerModule, Drawer, SharedModule, PrimeTemplate],
  template: `
    <p-drawer
      [visible]="isOpen"
      (visibleChange)="onVisibleChange($event)"
      position="right"
      [style]="getDrawerWidth()"
      [modal]="true"
      (onHide)="close()"
      [class]="'vx-prime-drawer drawer-' + size"
    >
      <ng-template pTemplate="header" *ngIf="title">
        <div class="vx-drawer-title-group">
          <h3 class="vx-drawer-title">{{ title }}</h3>
          <p class="vx-drawer-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
      </ng-template>

      <!-- Drawer Body -->
      <div class="vx-drawer-body">
        <ng-content></ng-content>
      </div>

      <!-- Drawer Footer -->
      <ng-template pTemplate="footer" *ngIf="showFooter">
        <div class="vx-drawer-footer">
          <ng-content select="[drawerFooter]"></ng-content>
        </div>
      </ng-template>
    </p-drawer>
  `,
  styles: [`
    .vx-drawer-title-group {
      display: flex;
      flex-direction: column;
      .vx-drawer-title { font-size: 15px; font-weight: 700; color: var(--vx-text-primary); }
      .vx-drawer-subtitle { font-size: 12px; color: var(--vx-text-muted); margin-top: 2px; }
    }
    .vx-drawer-body { flex: 1; overflow-y: auto; padding: 10px 0; }
    .vx-drawer-footer {
      display: flex; align-items: center; justify-content: flex-end; gap: 10px; width: 100%;
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

  getDrawerWidth(): { width: string } {
    switch (this.size) {
      case 'sm': return { width: '380px' };
      case 'md': return { width: '520px' };
      case 'lg': return { width: '720px' };
      case 'xl': return { width: '960px' };
      default: return { width: '520px' };
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
