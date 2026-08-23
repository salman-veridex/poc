import { ColDef, GridApi, GridOptions, RowClickedEvent, RowDoubleClickedEvent, SelectionChangedEvent } from 'ag-grid-community';

export interface GridAction<T = unknown> {
  id: string;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  permission?: string;
  isVisible?: (item: T) => boolean;
  isDisabled?: (item: T) => boolean;
  onClick: (item: T) => void;
}

export interface DataGridExportOptions {
  fileName?: string;
  sheetName?: string;
  allColumns?: boolean;
}

export interface DataGridServerSideParams {
  pageIndex: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  quickFilter?: string;
}

export type GridSelectionMode = 'single' | 'multiple' | 'none';

export interface DataGridOptions extends GridOptions {
  showQuickFilter?: boolean;
  showExport?: boolean;
  showColumnVisibility?: boolean;
  showRefresh?: boolean;
  showDensityToggle?: boolean;
  enableServerSide?: boolean;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}
