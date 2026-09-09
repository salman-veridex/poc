import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Table, TableCheckbox, TableHeaderCheckbox, TableModule, SortIcon, SortableColumn } from 'primeng/table';
import { Button, ButtonModule } from 'primeng/button';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { ColDef, DataGridExportOptions, GridAction, GridSelectionMode } from './data-grid.types';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PrimeTemplate,
    TableModule,
    Table,
    TableHeaderCheckbox,
    TableCheckbox,
    SortIcon,
    SortableColumn,
    ButtonModule,
    Button,
    InputTextModule,
    InputText,
    IconFieldModule,
    IconField,
    InputIconModule,
    InputIcon,
    TooltipModule,
    Tooltip
  ],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridComponent<T extends Record<string, any> = Record<string, any>> implements OnChanges {
  private sanitizer = inject(DomSanitizer);

  @Input({ required: true }) columnDefs: ColDef<T>[] = [];
  @Input() rowData: T[] | null = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() totalCount?: number;
  @Input() pagination = true;
  @Input() pageSize = 20;
  @Input() selectionMode: GridSelectionMode = 'multiple';
  @Input() showQuickFilter = true;
  @Input() showExport = true;
  @Input() showRefresh = true;
  @Input() showDensityToggle = true;
  @Input() emptyTitle = 'No insurance records found';
  @Input() emptyMessage = 'Try refining your search filter or add a new transaction.';
  @Input() actions: GridAction<T>[] = [];
  @Input() gridHeight = '520px';

  @Output() rowSelected = new EventEmitter<T[]>();
  @Output() rowClicked = new EventEmitter<T>();
  @Output() rowDoubleClicked = new EventEmitter<T>();
  @Output() refreshClicked = new EventEmitter<void>();

  @ViewChild('dt') dt!: Table;

  searchTerm = signal<string>('');
  selectedRows = signal<T[]>([]);
  isDense = signal<boolean>(false);

  visibleColumns = computed(() => {
    return (this.columnDefs || []).filter(col => !col.hide && col.field !== 'checkbox');
  });

  filterFields = computed(() => {
    return this.visibleColumns()
      .map(col => col.field)
      .filter((field): field is string => !!field);
  });

  hasCheckboxSelection = computed(() => {
    return (this.columnDefs || []).some(col => col.checkboxSelection || col.headerCheckboxSelection || col.field === 'checkbox');
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowData']) {
      this.selectedRows.set([]);
    }
  }

  onSelectionChange(rows: T[] | T | null): void {
    const rowArray = Array.isArray(rows) ? rows : (rows ? [rows] : []);
    this.selectedRows.set(rowArray);
    this.rowSelected.emit(rowArray);
  }

  onRowClick(row: T): void {
    this.rowClicked.emit(row);
  }

  onRowDblClick(row: T): void {
    this.rowDoubleClicked.emit(row);
  }

  onQuickFilterChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value || '';
    this.searchTerm.set(value);
    if (this.dt) {
      this.dt.filterGlobal(value, 'contains');
    }
  }

  clearSearch(): void {
    this.searchTerm.set('');
    if (this.dt) {
      this.dt.filterGlobal('', 'contains');
    }
  }

  toggleDensity(): void {
    this.isDense.update(dense => !dense);
  }

  exportCsv(options?: DataGridExportOptions): void {
    if (this.dt) {
      this.dt.exportCSV();
    }
  }

  onRefresh(): void {
    this.refreshClicked.emit();
  }

  getSelectedRows(): T[] {
    return this.selectedRows();
  }

  getCellValue(row: T, col: ColDef<T>): SafeHtml | string {
    const rawVal = col.field ? this.getNestedValue(row, col.field) : undefined;
    let formatted: any = rawVal;

    if (col.valueFormatter) {
      formatted = col.valueFormatter({ value: rawVal, data: row, colDef: col });
    } else if (col.cellRenderer) {
      formatted = col.cellRenderer({ value: rawVal, data: row, colDef: col });
    }

    if (formatted === null || formatted === undefined) {
      return '';
    }

    if (typeof formatted === 'string' && (formatted.includes('<') || formatted.includes('&'))) {
      return this.sanitizer.bypassSecurityTrustHtml(formatted);
    }

    return String(formatted);
  }

  getCellStyle(row: T, col: ColDef<T>): Record<string, any> | null {
    if (!col.cellStyle) return null;
    if (typeof col.cellStyle === 'function') {
      const rawVal = col.field ? this.getNestedValue(row, col.field) : undefined;
      return col.cellStyle({ value: rawVal, data: row, colDef: col });
    }
    return col.cellStyle;
  }

  private getNestedValue(obj: any, path: string): any {
    if (!obj || !path) return undefined;
    if (path in obj) return obj[path];
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }
}
