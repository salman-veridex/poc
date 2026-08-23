import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FnolService } from '../../services/fnol.service';

@Component({
  selector: 'app-fnol-create-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="vx-wizard-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>First Notice of Loss (FNOL) Incident Reporting Wizard</h1>
          <p>Record incident facts, claimant details, initial loss estimate, and trigger automatic coverage verification</p>
        </div>
        <div class="vx-page-actions">
          <a routerLink="/claims/fnol" class="btn btn-secondary btn-sm">Cancel</a>
          <button type="button" class="btn btn-primary btn-sm" (click)="saveClaim()" [disabled]="saving()">
            {{ saving() ? 'Lodging FNOL...' : 'Submit FNOL & Assign Adjuster' }}
          </button>
        </div>
      </div>

      <div class="vx-card">
        <form [formGroup]="fnolForm">
          <div class="vx-card-body">
            <h3 style="font-size: 14px; font-weight: 700; color: var(--vx-brand-navy); margin-bottom: 16px;">
              Policy & Incident Information
            </h3>

            <div class="grid-cols-2">
              <div class="vx-form-group">
                <label>Policy Number *</label>
                <input type="text" formControlName="policyNumber" class="form-control" placeholder="POL-US-2026-89421" />
              </div>
              <div class="vx-form-group">
                <label>Named Insured Entity *</label>
                <input type="text" formControlName="insuredName" class="form-control" />
              </div>
            </div>

            <div class="grid-cols-3 mt-4">
              <div class="vx-form-group">
                <label>Date of Loss *</label>
                <input type="date" formControlName="lossDate" class="form-control" />
              </div>
              <div class="vx-form-group">
                <label>Incident Location / Address *</label>
                <input type="text" formControlName="incidentLocation" class="form-control" placeholder="e.g. 500 Industrial Pkwy, Newark NJ" />
              </div>
              <div class="vx-form-group">
                <label>Primary Peril Category *</label>
                <select formControlName="perilType" class="form-control">
                  <option value="Water Damage & Pipe Freeze">Water Damage & Pipe Freeze</option>
                  <option value="Commercial Fire & Smoke">Commercial Fire & Smoke</option>
                  <option value="Ransomware & Cyber Extortion">Ransomware & Cyber Extortion</option>
                  <option value="Windstorm & Hail">Windstorm & Hail</option>
                  <option value="Transit Cargo Spoilage">Transit Cargo Spoilage</option>
                </select>
              </div>
            </div>

            <div class="grid-cols-2 mt-4">
              <div class="vx-form-group">
                <label>Claimant / Reporting Party Name *</label>
                <input type="text" formControlName="claimantName" class="form-control" />
              </div>
              <div class="vx-form-group">
                <label>Initial Estimated Reserve ($) *</label>
                <input type="number" formControlName="totalReserve" class="form-control" />
              </div>
            </div>

            <div class="vx-form-group mt-4">
              <label>Detailed Incident Narrative & Damage Description *</label>
              <textarea formControlName="narrative" rows="4" class="form-control" placeholder="Provide complete facts of the loss, emergency mitigation actions taken, and police/fire brigade involvement..."></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .vx-wizard-container { display: flex; flex-direction: column; gap: 16px; }
    .vx-page-header {
      display: flex; align-items: center; justify-content: space-between;
      h1 { font-size: 18px; font-weight: 700; color: var(--vx-brand-navy); }
      p { font-size: 12px; color: var(--vx-text-muted); }
    }
    .vx-form-group {
      display: flex; flex-direction: column; gap: 4px;
      label { font-size: 12px; font-weight: 600; color: var(--vx-text-primary); }
    }
    .form-control {
      width: 100%; height: 34px; padding: 0 10px; font-size: 12.5px;
      border: 1px solid var(--vx-border-medium); border-radius: var(--vx-radius-md);
      background-color: #ffffff; color: var(--vx-text-primary);
      &:focus { outline: none; border-color: var(--vx-brand-primary); box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.15); }
    }
    textarea.form-control { height: auto; padding: 8px 10px; }
    .mt-4 { margin-top: 16px; }
  `]
})
export class FnolCreatePage {
  private fb = inject(FormBuilder);
  private fnolService = inject(FnolService);
  private router = inject(Router);

  saving = signal(false);

  fnolForm: FormGroup = this.fb.group({
    policyNumber: ['POL-US-2026-89421', [Validators.required]],
    insuredName: ['Nexus Renewable Energy Inc', [Validators.required]],
    lossDate: [new Date().toISOString().split('T')[0], [Validators.required]],
    incidentLocation: ['Desert Peak Solar Substation, Reno NV', [Validators.required]],
    perilType: ['Windstorm & Hail', [Validators.required]],
    claimantName: ['Nexus Renewable Energy Inc', [Validators.required]],
    totalReserve: [45000, [Validators.required, Validators.min(0)]],
    narrative: ['Severe microburst hail storm caused shattered photovoltaic panels on Inverter Row 4B.', [Validators.required]]
  });

  saveClaim(): void {
    if (this.fnolForm.invalid) return;

    this.saving.set(true);
    const val = this.fnolForm.value;

    this.fnolService.createClaim(val).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/claims/fnol']);
      },
      error: () => {
        this.saving.set(false);
      }
    });
  }
}
