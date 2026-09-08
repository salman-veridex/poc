import { ColDef, GridOptions } from './data-grid.types';

export const DEFAULT_COL_DEF: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 100
};

export const DEFAULT_GRID_OPTIONS: GridOptions = {
  defaultColDef: DEFAULT_COL_DEF,
  rowHeight: 42,
  headerHeight: 40,
  pagination: true,
  paginationPageSize: 20,
  paginationPageSizeSelector: [10, 20, 50, 100]
};
