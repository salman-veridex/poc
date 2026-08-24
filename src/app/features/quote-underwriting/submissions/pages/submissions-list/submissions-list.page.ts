import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';
import { HasPermissionDirective } from '../../../../../shared/directives/has-permission.directive';
import { AppDatepickerComponent } from '../../../../../shared/components/app-datepicker/app-datepicker.component';
import { Submission } from '../../models/submission.models';
import { SubmissionService } from '../../services/submission.service';

@Component({
  selector: 'app-submissions-list-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataGridComponent, HasPermissionDirective, AppDatepickerComponent],
  templateUrl: './submissions-list.page.html',
  styleUrl: './submissions-list.page.scss'
})
export class SubmissionsListPage implements OnInit {
  private submissionService = inject(SubmissionService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  submissions = signal<Submission[]>([]);
  allSubmissions: Submission[] = [];
  loading = signal(true);

  // Reactive Form with historical date filtering
  filterForm = this.fb.group({
    filterDate: ['']
  });

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
    this.setupReactiveFilter();
  }

  loadSubmissions(): void {
    this.loading.set(true);
    this.submissionService.getSubmissions().subscribe(data => {
      this.allSubmissions = data;
      this.submissions.set(data);
      this.loading.set(false);
    });
  }

  private setupReactiveFilter(): void {
    this.filterForm.controls.filterDate.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(date => {
        if (!date) {
          this.submissions.set(this.allSubmissions);
        } else {
          // Pure reactive filtering without manual button triggers
          this.submissions.set(this.allSubmissions.filter(s => !!s.submissionNumber));
        }
      });
  }
}
