import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';
import { HasPermissionDirective } from '../../../../../shared/directives/has-permission.directive';
import { Submission } from '../../models/submission.models';
import { SubmissionService } from '../../services/submission.service';

@Component({
  selector: 'app-submissions-list-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent, HasPermissionDirective],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Submission Intake & Underwriting Triage Pipeline</h1>
          <p>Manage commercial broker submissions, risk score triages, appetite scoring, and underwriter assignment</p>
        </div>
        <button *hasPermission="'QUOTE_CREATE'" class="btn btn-primary btn-sm">+ New Submission Intake</button>
      </div>

      <app-data-grid
        title="Active Intake Submissions"
        subtitle="Submissions received via Broker Portal, ACORD XML, and API intake streams"
        [columnDefs]="columnDefs"
        [rowData]="submissions()"
        [loading]="loading()"
        gridHeight="600px"
        (refreshClicked)="loadSubmissions()"
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
export class SubmissionsListPage implements OnInit {
  private submissionService = inject(SubmissionService);

  submissions = signal<Submission[]>([]);
  loading = signal(true);

  columnDefs: ColDef<Submission>[] = [
    {
      field: 'submissionNumber',
      headerName: 'Submission #',
      width: 150,
      cellStyle: { fontFamily: 'var(--vx-font-mono)', fontWeight: '700', color: 'var(--vx-brand-primary)' }
    },
    {
      field: 'insuredName',
      headerName: 'Named Insured Entity',
      flex: 2,
      minWidth: 240,
      cellStyle: { fontWeight: '600' }
    },
    {
      field: 'brokerageAgency',
      headerName: 'Brokerage / Source',
      minWidth: 200
    },
    {
      field: 'lineOfBusiness',
      headerName: 'Line of Business',
      minWidth: 220
    },
    {
      field: 'totalInsuredValue',
      headerName: 'Total Exposure (TIV)',
      width: 170,
      type: 'numericColumn',
      valueFormatter: (params) => (params.value ? `$${(params.value / 1000000).toFixed(2)}M` : '$0.00')
    },
    {
      field: 'triageScore',
      headerName: 'Triage Score',
      width: 130,
      cellRenderer: (params: ICellRendererParams) => {
        const score = Number(params.value || 0);
        const bg = score >= 85 ? '#ecfdf5' : (score >= 70 ? '#fffbeb' : '#fef2f2');
        const color = score >= 85 ? '#047857' : (score >= 70 ? '#b45309' : '#b91c1c');
        return `<span style="background-color: ${bg}; color: ${color}; font-weight: 700; padding: 2px 8px; border-radius: 4px;">${score}/100</span>`;
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      cellRenderer: (params: ICellRendererParams) => {
        const val = params.value || 'INTAKE';
        const color = val === 'BOUND' ? 'badge-active' : (val === 'REFERRED' ? 'badge-referred' : (val === 'QUOTED' ? 'badge-info' : 'badge-pending'));
        return `<span class="vx-status-badge ${color}"><span class="badge-dot"></span>${val}</span>`;
      }
    },
    {
      field: 'assignedUnderwriter',
      headerName: 'Underwriter',
      width: 160
    }
  ];

  ngOnInit(): void {
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    this.loading.set(true);
    this.submissionService.getSubmissions().subscribe(data => {
      this.submissions.set(data);
      this.loading.set(false);
    });
  }
}
