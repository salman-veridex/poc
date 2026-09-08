import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-referrals-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Underwriting Referrals & Escalation Governance</h1>
          <p>Submissions and quotes triggered by risk rules exceeding junior or standard underwriter authority</p>
        </div>
      </div>

      <app-data-grid
        title="Escalated Referral Requests"
        [columnDefs]="columnDefs"
        [rowData]="referrals()"
        gridHeight="560px"
      />
    </div>
  `,
  styles: [`
    .vx-page-container { display: flex; flex-direction: column; gap: 16px; }
    .vx-page-header {
      display: flex; align-items: center; justify-content: space-between;
      h1 { font-size: 18px; font-weight: 700; color: var(--vx-brand-navy); }
      p { font-size: 12px; color: var(--vx-text-muted); }
    }
  `]
})
export class ReferralsPage {
  referrals = signal([
    { refId: 'REF-2026-101', account: 'Atlantic Maritime Logistics Ltd', trigger: 'Capacity Limit Exceeded (> $5M)', requestingUW: 'Alexander Vance', targetAuthority: 'Chief Underwriting Officer', status: 'PENDING_APPROVAL' },
    { refId: 'REF-2026-102', account: 'Vanguard Chemicals Inc', trigger: 'Environmental Hazard NAICS 3251', requestingUW: 'Marcus Sterling', targetAuthority: 'Senior Specialist Underwriter', status: 'IN_REVIEW' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'refId', headerName: 'Referral ID', width: 150, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'account', headerName: 'Insured Entity', flex: 2, minWidth: 220, cellStyle: { fontWeight: '600' } },
    { field: 'trigger', headerName: 'Referral Trigger Reason', flex: 2, minWidth: 260, cellStyle: { color: 'var(--vx-danger)' } },
    { field: 'requestingUW', headerName: 'Originating UW', width: 170 },
    { field: 'targetAuthority', headerName: 'Required Sign-off', width: 220 },
    { field: 'status', headerName: 'Status', width: 160 }
  ];
}
