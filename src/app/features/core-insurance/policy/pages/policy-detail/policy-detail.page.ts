import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { CurrencyFormatPipe } from '../../../../../shared/pipes/currency-format.pipe';
import { PolicySchedule } from '../../models/policy.models';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-policy-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, CurrencyFormatPipe],
  template: `
    @if (policy(); as pol) {
      <div class="vx-policy-detail-container">
        <!-- Header -->
        <div class="vx-page-header">
          <div class="vx-page-title-group">
            <div class="title-row">
              <h1>{{ pol.insuredName }}</h1>
              <span class="policy-num">{{ pol.policyNumber }}</span>
              <app-status-badge [status]="pol.status" />
            </div>
            <p>{{ pol.productName }} • Term {{ pol.termNumber }} • {{ pol.effectiveDate }} to {{ pol.expirationDate }}</p>
          </div>
          <div class="vx-page-actions">
            <a routerLink="/core-insurance/policies" class="btn btn-secondary btn-sm">&larr; Back to Policies</a>
            <a routerLink="/core-insurance/endorsements" class="btn btn-secondary btn-sm">Issue Endorsement</a>
            <a routerLink="/claims/fnol" class="btn btn-primary btn-sm">File FNOL Claim</a>
          </div>
        </div>

        <!-- Metric Summary -->
        <div class="grid-cols-4">
          <div class="vx-card p-3">
            <span class="label-muted">Annual In-Force Premium</span>
            <strong class="val-text">{{ pol.annualPremium | currencyFormat }}</strong>
          </div>
          <div class="vx-card p-3">
            <span class="label-muted">Total Insured Value (TIV)</span>
            <strong class="val-text">{{ pol.totalInsuredValue | currencyFormat }}</strong>
          </div>
          <div class="vx-card p-3">
            <span class="label-muted">Billing Payment Plan</span>
            <strong class="val-text">{{ pol.paymentPlan.replace('_', ' ') }}</strong>
          </div>
          <div class="vx-card p-3">
            <span class="label-muted">Assigned Underwriter</span>
            <strong class="val-text">{{ pol.underwriter }}</strong>
          </div>
        </div>

        <!-- Policy Schedule Tabs -->
        <div class="vx-card mt-4">
          <div class="vx-card-header">
            <h3 class="vx-card-title">Policy 360 Coverage Summary & Schedule Forms</h3>
          </div>
          <div class="vx-card-body">
            <div class="vx-schedule-grid">
              <div class="schedule-item">
                <span class="item-label">Issuing Syndicate Entity</span>
                <span class="item-val">{{ pol.issuingSyndicate }}</span>
              </div>
              <div class="schedule-item">
                <span class="item-label">Policy Inception Date</span>
                <span class="item-val">{{ pol.effectiveDate }} 12:01 AM Standard Time</span>
              </div>
              <div class="schedule-item">
                <span class="item-label">Expiration Date</span>
                <span class="item-val">{{ pol.expirationDate }} 12:01 AM Standard Time</span>
              </div>
              <div class="schedule-item">
                <span class="item-label">Direct Dec-Page PDF</span>
                <a href="#" class="item-val link">Download Dec-Page_POL-89421.pdf</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .vx-policy-detail-container { display: flex; flex-direction: column; gap: 16px; }
    .title-row {
      display: flex; align-items: center; gap: 10px;
      h1 { font-size: 18px; font-weight: 700; color: var(--vx-brand-navy); }
      .policy-num {
        font-family: var(--vx-font-mono); font-size: 13px; font-weight: 700;
        background: var(--vx-brand-primary-light); color: var(--vx-brand-primary);
        padding: 2px 8px; border-radius: 4px;
      }
    }
    .p-3 { padding: 14px; }
    .mt-4 { margin-top: 16px; }
    .label-muted { font-size: 11px; color: var(--vx-text-muted); display: block; margin-bottom: 4px; }
    .val-text { font-size: 16px; font-weight: 700; color: var(--vx-text-primary); }
    .vx-schedule-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
      .schedule-item {
        display: flex; flex-direction: column; gap: 3px;
        .item-label { font-size: 11.5px; color: var(--vx-text-muted); font-weight: 600; }
        .item-val { font-size: 13px; color: var(--vx-text-primary); font-weight: 500; }
        .link { color: var(--vx-brand-primary); font-weight: 600; }
      }
    }
  `]
})
export class PolicyDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private policyService = inject(PolicyService);

  policy = signal<PolicySchedule | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || 'pol_1001';
    this.policyService.getPolicyById(id).subscribe(p => this.policy.set(p));
  }
}
