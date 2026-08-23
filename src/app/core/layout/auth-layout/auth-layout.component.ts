import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="vx-auth-layout-container">
      <div class="vx-auth-card-wrapper">
        <div class="vx-auth-brand">
          <div class="vx-auth-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h1>VERIDEX</h1>
          <p>Next-Gen Insurance ERP & PAS Platform</p>
        </div>
        <div class="vx-auth-content">
          <router-outlet />
        </div>
        <div class="vx-auth-footer">
          <span>&copy; 2026 Veridex Insurance Systems. Enterprise Grade Security.</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vx-auth-layout-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 20%, #0d233a 0%, #071529 100%);
      padding: 24px;
    }
    .vx-auth-card-wrapper {
      width: 100%;
      max-width: 440px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .vx-auth-brand {
      text-align: center;
      margin-bottom: 24px;
      color: #ffffff;
      .vx-auth-brand-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #0052cc 0%, #0c66e4 100%);
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        box-shadow: 0 4px 14px rgba(0, 82, 204, 0.4);
        svg {
          width: 28px;
          height: 28px;
          color: #fff;
        }
      }
      h1 {
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 0.1em;
        color: #ffffff;
        margin-bottom: 4px;
      }
      p {
        font-size: 13px;
        color: #94a3b8;
      }
    }
    .vx-auth-content {
      width: 100%;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
      padding: 32px 28px;
    }
    .vx-auth-footer {
      margin-top: 24px;
      font-size: 11px;
      color: #64748b;
      text-align: center;
    }
  `]
})
export class AuthLayoutComponent {}
