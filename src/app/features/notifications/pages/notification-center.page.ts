import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-notification-center-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Notification & Real-Time Alert Center</h1>
          <p>Underwriting referral alerts, claim reserve SLA warnings, binding orders, and policyholder payment notices</p>
        </div>
        <button class="btn btn-secondary btn-sm" (click)="markAllAsRead()">Mark All as Read</button>
      </div>

      <div class="vx-notifications-list">
        @for (item of notifications(); track item.id) {
          <div class="vx-card vx-notification-item" [class.is-unread]="item.unread">
            <div class="notif-icon-circle" [class]="'type-' + item.type">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div class="notif-content">
              <div class="notif-title-row">
                <span class="notif-title">{{ item.title }}</span>
                <span class="notif-time">{{ item.time }}</span>
              </div>
              <p class="notif-desc">{{ item.message }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .vx-page-container { display: flex; flex-direction: column; gap: 16px; }
    .vx-page-header {
      display: flex; align-items: center; justify-content: space-between;
      h1 { font-size: 18px; font-weight: 700; color: var(--vx-brand-navy); }
      p { font-size: 12px; color: var(--vx-text-muted); }
    }
    .vx-notifications-list { display: flex; flex-direction: column; gap: 10px; }
    .vx-notification-item {
      padding: 14px 18px; display: flex; align-items: flex-start; gap: 14px;
      &.is-unread { border-left: 3px solid var(--vx-brand-primary); background-color: #fcfdfe; }
      .notif-icon-circle {
        width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        svg { width: 18px; height: 18px; }
        &.type-referral { background-color: #fffbeb; color: #b45309; }
        &.type-payment { background-color: #ecfdf5; color: #047857; }
        &.type-sla { background-color: #fef2f2; color: #b91c1c; }
      }
      .notif-content {
        flex: 1; display: flex; flex-direction: column; gap: 3px;
        .notif-title-row {
          display: flex; align-items: center; justify-content: space-between;
          .notif-title { font-size: 13px; font-weight: 700; color: var(--vx-text-primary); }
          .notif-time { font-size: 11px; color: var(--vx-text-muted); }
        }
        .notif-desc { font-size: 12px; color: var(--vx-text-secondary); line-height: 1.4; }
      }
    }
  `]
})
export class NotificationCenterPage {
  notifications = signal([
    { id: '1', type: 'referral', title: 'High-Value Marine Cargo Referral Triggered', message: 'Account Atlantic Maritime Logistics Ltd exceeds $5M Level 1 limit. Awaiting CUO dual sign-off.', time: '10 mins ago', unread: true },
    { id: '2', type: 'payment', title: 'Direct Bill Settlement Received ($46,250.00)', message: 'JPMorgan FedWire matched against Policy POL-US-2026-89421 (Nexus Renewable Energy).', time: '1 hour ago', unread: true },
    { id: '3', type: 'sla', title: 'Claims Reserve SLA Warning (24 Hours Remaining)', message: 'Claim CLM-US-2026-00432 requires initial case reserve sign-off within 24 hours of FNOL.', time: '3 hours ago', unread: false }
  ]);

  markAllAsRead(): void {
    this.notifications.update(items => items.map(i => ({ ...i, unread: false })));
  }
}
