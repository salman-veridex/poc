import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-comparison-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Product & Appetite Comparison Matrix</h1>
          <p>Side-by-side comparison of coverage extensions, deductibles, and rating parameters across product editions</p>
        </div>
      </div>

      <div class="vx-card p-4">
        <div class="vx-comparison-table-wrapper">
          <table class="vx-comp-table">
            <thead>
              <tr>
                <th>Coverage Feature</th>
                <th>Standard Cyber Form (v3.0)</th>
                <th>Enterprise Ransomware Shield (v4.2)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ransomware Extortion Limit</td>
                <td>$1,000,000 Sub-limit</td>
                <td><strong style="color: var(--vx-success);">Full Policy Limit (Up to $25M)</strong></td>
              </tr>
              <tr>
                <td>Business Interruption Period</td>
                <td>30 Days</td>
                <td><strong style="color: var(--vx-success);">180 Days Extended</strong></td>
              </tr>
              <tr>
                <td>Waiting Period Deductible</td>
                <td>24 Hours</td>
                <td><strong style="color: var(--vx-success);">8 Hours Minimum</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
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
    .p-4 { padding: 20px; }
    .vx-comp-table {
      width: 100%; border-collapse: collapse; font-size: 13px;
      th, td { padding: 12px 16px; border: 1px solid var(--vx-border-subtle); text-align: left; }
      th { background-color: var(--vx-bg-subtle); font-weight: 700; color: var(--vx-brand-navy); }
    }
  `]
})
export class ComparisonPage {}
