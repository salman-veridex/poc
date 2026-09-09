export interface ColDef<T = any> {
  field?: string;
  headerName?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
  sortable?: boolean;
  filter?: boolean | string;
  hide?: boolean;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  valueFormatter?: (params: ValueFormatterParams<T>) => string;
  cellRenderer?: (params: ICellRendererParams<T>) => string;
  cellStyle?: Record<string, any> | ((params: CellClassParams<T>) => Record<string, any>);
  cellClass?: string | ((params: CellClassParams<T>) => string);
  [key: string]: any;
}

export interface ICellRendererParams<TData = any, TValue = any> {
  value: TValue;
  data: TData;
  node?: any;
  colDef?: ColDef<TData>;
  api?: GridApi<TData>;
  [key: string]: any;
}

export interface ValueFormatterParams<TData = any, TValue = any> {
  value: TValue;
  data: TData;
  node?: any;
  colDef?: ColDef<TData>;
  api?: GridApi<TData>;
  [key: string]: any;
}

export interface CellClassParams<TData = any, TValue = any> {
  value: TValue;
  data: TData;
  node?: any;
  colDef?: ColDef<TData>;
  api?: GridApi<TData>;
  [key: string]: any;
}

export type ICellRendererComp = any;

export interface GridApi<T = any> {
  getSelectedRows: () => T[];
  exportDataAsCsv: (options?: any) => void;
  setGridOption: (option: string, value: any) => void;
  resetRowHeights: () => void;
}

export interface GridOptions<T = any> {
  defaultColDef?: ColDef<T>;
  rowHeight?: number;
  headerHeight?: number;
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  [key: string]: any;
}

export interface RowClickedEvent<T = any> {
  data: T;
}

export interface RowDoubleClickedEvent<T = any> {
  data: T;
}

export interface SelectionChangedEvent<T = any> {
  api: GridApi<T>;
}

export interface GridReadyEvent<T = any> {
  api: GridApi<T>;
}

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

export interface DataGridOptions<T = any> extends GridOptions<T> {
  showQuickFilter?: boolean;
  showExport?: boolean;
  showColumnVisibility?: boolean;
  showRefresh?: boolean;
  showDensityToggle?: boolean;
  enableServerSide?: boolean;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}
