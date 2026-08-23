import { AllCommunityModule, ColDef, GridOptions, ModuleRegistry } from 'ag-grid-community';

// Register AG Grid Community modules globally
ModuleRegistry.registerModules([AllCommunityModule]);

export const DEFAULT_COL_DEF: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 100,
  suppressHeaderMenuButton: false
};

export const DEFAULT_GRID_OPTIONS: GridOptions = {
  defaultColDef: DEFAULT_COL_DEF,
  rowHeight: 42,
  headerHeight: 40,
  pagination: true,
  paginationPageSize: 20,
  paginationPageSizeSelector: [10, 20, 50, 100],
  animateRows: false,
  suppressCellFocus: false,
  rowSelection: {
    mode: 'multiRow',
    enableClickSelection: false,
    headerCheckbox: true,
    checkboxes: true
  }
};
