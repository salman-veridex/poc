import type { Meta, StoryObj } from '@storybook/angular-vite';
import { SelectComponent } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Form Controls/Select Dropdown',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    error: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const LineOfBusinessSelect: Story = {
  args: {
    label: 'Line of Business (LOB)',
    placeholder: 'Choose Insurance Line...',
    required: true,
    options: [
      { value: 'COMMERCIAL_PROPERTY', label: 'Commercial Property & Business Income' },
      { value: 'GENERAL_LIABILITY', label: 'Commercial General Liability (CGL)' },
      { value: 'CYBER_RISK', label: 'Enterprise Cyber Risk & Tech E&O' },
      { value: 'INLAND_MARINE', label: 'Global Supply Chain & Inland Marine' },
      { value: 'DIRECTORS_OFFICERS', label: 'Directors & Officers (D&O) Liability' }
    ],
    hint: 'Select the primary regulatory line of business for statutory reporting'
  }
};
