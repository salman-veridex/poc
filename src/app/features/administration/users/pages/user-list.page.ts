import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Enterprise User Directory & Identity Governance</h1>
          <p>Manage underwriters, claim adjusters, actuaries, finance officers, and external broker credentials</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Provision User Account</button>
      </div>

      <app-data-grid
        title="Active User Accounts"
        [columnDefs]="columnDefs"
        [rowData]="users()"
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
export class UserListPage {
  users = signal([
    { userId: 'USR-88921', name: 'Alexander Vance', email: 'alexander.vance@veridex.insurance', primaryRole: 'SUPER_ADMIN', department: 'Enterprise Underwriting', lastLogin: 'Today, 09:15 AM', status: 'ACTIVE' },
    { userId: 'USR-88922', name: 'Evelyn Reed', email: 'evelyn.reed@veridex.insurance', primaryRole: 'CLAIMS_MANAGER', department: 'Claims Adjudication', lastLogin: 'Today, 08:30 AM', status: 'ACTIVE' },
    { userId: 'USR-88923', name: 'Sarah Jenkins', email: 'sarah.jenkins@veridex.insurance', primaryRole: 'ACTUARY', department: 'Actuarial & Product Studio', lastLogin: 'Yesterday, 16:45', status: 'ACTIVE' },
    { userId: 'USR-88924', name: 'James McAvoy', email: 'james.mcavoy@aon.com', primaryRole: 'BROKER', department: 'Aon Commercial Risk', lastLogin: 'Today, 10:02 AM', status: 'ACTIVE' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 140, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'name', headerName: 'Full Name', flex: 2, minWidth: 200, cellStyle: { fontWeight: '600' } },
    { field: 'email', headerName: 'Work Email Address', flex: 2, minWidth: 240 },
    { field: 'primaryRole', headerName: 'Primary Role', width: 180 },
    { field: 'department', headerName: 'Department / Organization', width: 220 },
    { field: 'lastLogin', headerName: 'Last Active', width: 160 },
    { field: 'status', headerName: 'Account Status', width: 140 }
  ];
}
