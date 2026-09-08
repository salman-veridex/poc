import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from '../../../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-questions-page',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  template: `
    <div class="vx-page-container">
      <div class="vx-page-header">
        <div class="vx-page-title-group">
          <h1>Dynamic Question Matrix & Intake Forms Engine</h1>
          <p>Configure dynamic questions, validation schemas, conditional visibility, and dependency hierarchies</p>
        </div>
        <button class="btn btn-primary btn-sm">+ Create Intake Question</button>
      </div>

      <app-data-grid
        title="Reusable Question Library"
        [columnDefs]="columnDefs"
        [rowData]="questions()"
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
export class QuestionsPage {
  questions = signal([
    { key: 'q_mfa_implemented', label: 'Is Multi-Factor Authentication (MFA) enforced on all remote and admin accounts?', type: 'BOOLEAN', section: 'Cyber Security Controls', triggerRule: 'If False => Decline / Referral' },
    { key: 'q_roof_update_year', label: 'Year of last complete commercial roof replacement', type: 'NUMBER', section: 'Building Construction', triggerRule: 'If > 20 Years => 15% Surcharge' },
    { key: 'q_sprinkler_cert', label: 'NFPA 25 Annual Inspection Certificate Attached', type: 'FILE_UPLOAD', section: 'Fire Protection', triggerRule: 'Required for Binding' },
    { key: 'q_prior_claims_count', label: 'Number of commercial liability claims in past 5 years', type: 'NUMBER', section: 'Loss History', triggerRule: 'If > 2 => Referral to Senior UW' }
  ]);

  columnDefs: ColDef[] = [
    { field: 'key', headerName: 'Field Key', width: 200, cellStyle: { fontWeight: '700', fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-brand-primary)' } },
    { field: 'label', headerName: 'Question Prompt', flex: 2, minWidth: 300, cellStyle: { fontWeight: '600' } },
    { field: 'type', headerName: 'Input Component', width: 150 },
    { field: 'section', headerName: 'Form Section', width: 180 },
    { field: 'triggerRule', headerName: 'Conditional Action Rule', width: 220 }
  ];
}
