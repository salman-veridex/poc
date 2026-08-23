import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="vx-login-form-container">
      <div class="vx-login-header">
        <h2>Enterprise Sign In</h2>
        <p>Access your Veridex underwriting, policy & claims workspace</p>
      </div>

      @if (errorMessage()) {
        <div class="vx-alert-danger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{{ errorMessage() }}</span>
        </div>
      }

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="vx-form">
        <div class="vx-form-field">
          <label for="email">Work Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="alexander.vance@veridex.insurance"
            class="form-control"
          />
        </div>

        <div class="vx-form-field">
          <div class="field-label-row">
            <label for="password">Password</label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>
          <input
            id="password"
            type="password"
            formControlName="password"
            placeholder="••••••••••••"
            class="form-control"
          />
        </div>

        <div class="vx-form-field">
          <label for="tenant">Underwriting Entity / Domain</label>
          <select id="tenant" formControlName="tenantId" class="form-control">
            <option value="tnt_us_east_primary">Veridex Global Underwriters (US-East)</option>
            <option value="tnt_uk_london_market">Veridex Lloyd's Syndicate 1948 (London)</option>
            <option value="tnt_apac_singapore">Veridex APAC Reinsurance Hub (Singapore)</option>
          </select>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-lg w-full"
          [disabled]="loginForm.invalid || loading()">
          @if (loading()) {
            <span>Authenticating...</span>
          } @else {
            <span>Sign In to Veridex ERP</span>
          }
        </button>
      </form>
    </div>
  `,
  styles: [`
    .vx-login-form-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .vx-login-header {
      margin-bottom: 8px;
      h2 { font-size: 18px; font-weight: 700; color: var(--vx-brand-navy); margin-bottom: 4px; }
      p { font-size: 12.5px; color: var(--vx-text-muted); }
    }
    .vx-alert-danger {
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: var(--vx-radius-md);
      padding: 10px 12px;
      color: var(--vx-danger);
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      svg { width: 16px; height: 16px; flex-shrink: 0; }
    }
    .vx-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .vx-form-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      label {
        font-size: 12px;
        font-weight: 600;
        color: var(--vx-text-primary);
      }
      .field-label-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .forgot-link { font-size: 11.5px; }
      }
    }
    .form-control {
      width: 100%;
      height: 38px;
      padding: 0 12px;
      border: 1px solid var(--vx-border-medium);
      border-radius: var(--vx-radius-md);
      font-size: 13px;
      color: var(--vx-text-primary);
      background-color: #ffffff;
      transition: all 0.15s ease;
      &:focus {
        outline: none;
        border-color: var(--vx-brand-primary);
        box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.15);
      }
    }
  `]
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['alexander.vance@veridex.insurance', [Validators.required, Validators.email]],
    password: ['VeridexEnterprise2026!', [Validators.required, Validators.minLength(6)]],
    tenantId: ['tnt_us_east_primary', [Validators.required]]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    const { email, password, tenantId } = this.loginForm.value;
    this.authService.login({ email: email!, password: password!, tenantId: tenantId! }).subscribe({
      next: () => {
        this.loading.set(false);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.message || 'Authentication failed');
      }
    });
  }
}
