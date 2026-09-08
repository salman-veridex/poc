import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-roles-list-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Roles & Role-Based Access Control (RBAC)</h1>
          <p>Define enterprise roles, authority limits, feature entitlements, and dual-authorization matrices</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Create Custom Role</button>
      </div>

      <app-data-grid
        title="Configured Security Roles"
        [columnDefs]="columnDefs"
        [rowData]="roles()"
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
export class RolesListPage {
  roles = signal([
    { roleCode: 'SUPER_ADMIN', roleName: 'Enterprise System Administrator', assignedUsers: 4, permissionsCount: 'All 32 Permissions', maxBindingAuthority: 'Unlimited ($100M+)', isSystem: 'Yes' },
    { roleCode: 'SENIOR_UNDERWRITER', roleName: 'Senior Underwriting Authority', assignedUsers: 18, permissionsCount: '24 Permissions', maxBindingAuthority: '$25,000,000 Limit', isSystem: 'Yes' },
    { roleCode: 'UNDERWRITER', roleName: 'Commercial Lines Underwriter', assignedUsers: 45, permissionsCount: '16 Permissions', maxBindingAuthority: '$5,000,000 Limit', isSystem: 'Yes' },
    { roleCode: 'CLAIMS_ADJUSTER', roleName: 'Claims Adjuster & Investigator', assignedUsers: 28, permissionsCount: '12 Permissions', maxBindingAuthority: '$100,000 Reserve Set', isSystem: 'Yes' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'roleCode', headerName: 'Role Key', width: 220, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'roleName', headerName: 'Role Title', flex: 2, minWidth: 240, cellStyle: { fontWeight: '600' } },
    { field: 'assignedUsers', headerName: 'Users Assigned', width: 150 },
    { field: 'permissionsCount', headerName: 'Entitlements', width: 180 },
    { field: 'maxBindingAuthority', headerName: 'Authority Ceiling', width: 200, cellStyle: { fontWeight: '700' } },
    { field: 'isSystem', headerName: 'System Role', width: 130 }
  ];
}
