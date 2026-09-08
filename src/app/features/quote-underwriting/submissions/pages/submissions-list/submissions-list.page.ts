import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColDef, ICellRendererParams } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';
import { AppDatepickerComponent } from '../../../../../shared/components/app-datepicker/app-datepicker.component';
import { DrawerComponent } from '../../../../../shared/components/drawer/drawer.component';
import { Submission, SubmissionStatus } from '../../models/submission.models';
import { SubmissionService } from '../../services/submission.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { SelectComponent } from '@shared/form-controls/select/select.component';

@Component({
  selector: 'app-submissions-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataGridComponent,
    AppDatepickerComponent,
    DrawerComponent,
    // SelectComponent
  ],
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

  // Reactive Form for historical date filtering
  filterForm = this.fb.group({
    filterDate: ['']
  });

  // Reusable Drawer State & Intake Form
  isIntakeDrawerOpen = false;
  intakeForm = this.fb.group({
    insuredName: ['', [Validators.required]],
    brokerName: ['Marcus Vance', [Validators.required]],
    brokerageAgency: ['Aon Risk Solutions', [Validators.required]],
    lineOfBusiness: ['Commercial Property', [Validators.required]],
    totalInsuredValue: [5000000, [Validators.required]],
    estimatedRevenue: [75000, [Validators.required]],
    assignedUnderwriter: ['Sarah Jenkins (Senior UW)', [Validators.required]],
    intakeDate: ['2026-08-24T10:30:00.000Z', [Validators.required]]
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

  // Drawer Controls
  openIntakeDrawer(): void {
    this.isIntakeDrawerOpen = true;
  }

  closeIntakeDrawer(): void {
    this.isIntakeDrawerOpen = false;
  }

  submitIntake(): void {
    if (this.intakeForm.invalid) {
      this.intakeForm.markAllAsTouched();
      return;
    }

    const val = this.intakeForm.value;
    const newSubmission: Submission = {
      id: `sub_${Date.now()}`,
      submissionNumber: `SUB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      insuredName: val.insuredName || 'Untitled Commercial Insured',
      brokerName: val.brokerName || 'Direct Broker',
      brokerageAgency: val.brokerageAgency || 'Direct Intake Portal',
      lineOfBusiness: val.lineOfBusiness || 'Commercial Property',
      requestedEffectiveDate: val.intakeDate || new Date().toISOString().substring(0, 10),
      totalInsuredValue: Number(val.totalInsuredValue) || 5000000,
      estimatedRevenue: Number(val.estimatedRevenue) || 75000,
      triageScore: Math.floor(75 + Math.random() * 20),
      status: 'INTAKE' as SubmissionStatus,
      assignedUnderwriter: val.assignedUnderwriter || 'Unassigned Triage Queue',
      createdAt: new Date().toISOString()
    };

    this.allSubmissions = [newSubmission, ...this.allSubmissions];
    this.submissions.set(this.allSubmissions);
    this.closeIntakeDrawer();
    this.intakeForm.reset({
      brokerName: 'Marcus Vance',
      brokerageAgency: 'Aon Risk Solutions',
      lineOfBusiness: 'Commercial Property',
      totalInsuredValue: 5000000,
      estimatedRevenue: 75000,
      assignedUnderwriter: 'Sarah Jenkins (Senior UW)',
      intakeDate: '2026-08-24T10:30:00.000Z'
    });
  }

  private setupReactiveFilter(): void {
    this.filterForm.controls.filterDate.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(date => {
        if (!date) {
          this.submissions.set(this.allSubmissions);
        } else {
          this.submissions.set(this.allSubmissions.filter(s => !!s.submissionNumber));
        }
      });
  }

  theme:any='classic'

  
  changeoutlet(){

    this.theme='modern-popup'

  }
}
