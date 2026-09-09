import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ColDef } from '@shared/components/data-grid/data-grid.types';
import { DataGridComponent } from './data-grid.component';

interface MockInsuranceRow {
  policyNumber: string;
  insuredName: string;
  lineOfBusiness: string;
  annualPremium: number;
  status: string;
  effectiveDate: string;
}

const mockColumnDefs: ColDef[] = [
  { field: 'policyNumber', headerName: 'Policy Number', checkboxSelection: true, headerCheckboxSelection: true, minWidth: 180 },
  { field: 'insuredName', headerName: 'Insured Entity', minWidth: 220 },
  { field: 'lineOfBusiness', headerName: 'Line of Business', minWidth: 180 },
  {
    field: 'annualPremium',
    headerName: 'Annual GWP',
    valueFormatter: params => params.value ? `$${params.value.toLocaleString()}` : '$0',
    minWidth: 150
  },
  { field: 'status', headerName: 'Status', minWidth: 120 },
  { field: 'effectiveDate', headerName: 'Effective Date', minWidth: 140 }
];

const mockRows: MockInsuranceRow[] = [
  { policyNumber: 'POL-US-2026-89421', insuredName: 'Nexus Renewable Energy Inc', lineOfBusiness: 'Commercial Property', annualPremium: 185000, status: 'ACTIVE', effectiveDate: '2026-08-15' },
  { policyNumber: 'POL-US-2026-89422', insuredName: 'Atlantic Maritime Logistics Ltd', lineOfBusiness: 'Inland Marine', annualPremium: 94000, status: 'ACTIVE', effectiveDate: '2026-06-01' },
  { policyNumber: 'POL-US-2026-89423', insuredName: 'Cascade Hospital Network Inc', lineOfBusiness: 'Directors & Officers', annualPremium: 412000, status: 'ACTIVE', effectiveDate: '2026-04-10' },
  { policyNumber: 'POL-US-2026-89424', insuredName: 'Summit Peak Logistics LLC', lineOfBusiness: 'Commercial Auto', annualPremium: 260000, status: 'ENDORSEMENT_PENDING', effectiveDate: '2026-01-01' }
];

const meta: Meta<DataGridComponent<MockInsuranceRow>> = {
  title: 'Shared UI/Data Grid (PrimeNG Table)',
  component: DataGridComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    loading: { control: 'boolean' },
    pagination: { control: 'boolean' },
    pageSize: { control: 'number' },
    showQuickFilter: { control: 'boolean' },
    showExport: { control: 'boolean' },
    showDensityToggle: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<DataGridComponent<MockInsuranceRow>>;

export const DefaultGrid: Story = {
  args: {
    title: 'Active Commercial Policies',
    subtitle: 'Real-time policy register synchronized with core PAS engine',
    columnDefs: mockColumnDefs,
    rowData: mockRows,
    loading: false,
    pagination: true,
    pageSize: 10,
    showQuickFilter: true,
    showExport: true,
    showDensityToggle: true
  }
};

export const LoadingState: Story = {
  args: {
    title: 'Active Commercial Policies',
    subtitle: 'Fetching live records from core API...',
    columnDefs: mockColumnDefs,
    rowData: [],
    loading: true
  }
};

export const EmptyState: Story = {
  args: {
    title: 'Filtered Submissions',
    subtitle: 'No records matching query',
    columnDefs: mockColumnDefs,
    rowData: [],
    loading: false,
    emptyTitle: 'No Matching Policy Records',
    emptyMessage: 'No policy records matched your filter criteria. Try resetting search filters.'
  }
};
