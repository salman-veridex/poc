import type { Meta, StoryObj } from '@storybook/angular-vite';
import { CurrencyInputComponent } from './currency-input.component';

const meta: Meta<CurrencyInputComponent> = {
  title: 'Form Controls/Currency Input',
  component: CurrencyInputComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    currencySymbol: { control: 'text' },
    currencyCode: { control: 'text' },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    error: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<CurrencyInputComponent>;

export const TotalInsuredValueInput: Story = {
  args: {
    label: 'Total Insured Value (TIV)',
    placeholder: '25,000,000.00',
    currencySymbol: '$',
    currencyCode: 'USD',
    required: true,
    hint: 'Aggregate replacement value of all insured scheduled property assets'
  }
};

export const ClaimReserveInput: Story = {
  args: {
    label: 'Indemnity Loss Reserve',
    placeholder: '150,000.00',
    currencySymbol: '£',
    currencyCode: 'GBP',
    required: true,
    hint: 'Estimated claim payout reserve for Lloyd’s Syndicate'
  }
};
