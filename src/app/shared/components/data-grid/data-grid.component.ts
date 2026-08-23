import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  signal
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  RowClickedEvent,
  RowDoubleClickedEvent,
  SelectionChangedEvent
} from 'ag-grid-community';
import { DEFAULT_COL_DEF, DEFAULT_GRID_OPTIONS } from './data-grid.config';
import { DataGridExportOptions, GridAction, GridSelectionMode } from './data-grid.types';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridComponent<T = unknown> implements OnChanges {
  @Input({ required: true }) columnDefs: ColDef[] = [];
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

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  gridApi!: GridApi;
  searchTerm = signal<string>('');
  selectedCount = signal<number>(0);
  isDense = signal<boolean>(false);

  defaultColDef: ColDef = DEFAULT_COL_DEF;
  gridOptions: GridOptions = {
    ...DEFAULT_GRID_OPTIONS,
    headerHeight: 38,
    rowHeight: 40
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageSize'] && this.gridApi) {
      this.gridApi.setGridOption('paginationPageSize', this.pageSize);
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    if (this.pageSize) {
      this.gridApi.setGridOption('paginationPageSize', this.pageSize);
    }
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    if (!this.gridApi) return;
    const selected = this.gridApi.getSelectedRows() as T[];
    this.selectedCount.set(selected.length);
    this.rowSelected.emit(selected);
  }

  onRowClicked(event: RowClickedEvent): void {
    if (event.data) {
      this.rowClicked.emit(event.data as T);
    }
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent): void {
    if (event.data) {
      this.rowDoubleClicked.emit(event.data as T);
    }
  }

  onQuickFilterChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchTerm.set(value);
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', value);
    }
  }

  clearSearch(): void {
    this.searchTerm.set('');
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', '');
    }
  }

  toggleDensity(): void {
    const nextDense = !this.isDense();
    this.isDense.set(nextDense);
    if (this.gridApi) {
      this.gridApi.setGridOption('rowHeight', nextDense ? 32 : 40);
      this.gridApi.setGridOption('headerHeight', nextDense ? 32 : 38);
      this.gridApi.resetRowHeights();
    }
  }

  exportCsv(options?: DataGridExportOptions): void {
    if (!this.gridApi) return;
    this.gridApi.exportDataAsCsv({
      fileName: options?.fileName || `${this.title || 'veridex-export'}-${Date.now()}.csv`,
      allColumns: options?.allColumns ?? true
    });
  }

  onRefresh(): void {
    this.refreshClicked.emit();
  }

  getSelectedRows(): T[] {
    return this.gridApi ? (this.gridApi.getSelectedRows() as T[]) : [];
  }
}
