import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DatePickerComponent } from './date-picker.component';

const meta: Meta<DatePickerComponent> = {
  title: 'Form Controls/Date Picker',
  component: DatePickerComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    error: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<DatePickerComponent>;

export const InceptionDate: Story = {
  args: {
    label: 'Policy Inception / Effective Date',
    required: true,
    hint: 'Coverage term starts at 12:01 AM standard time on this date'
  }
};
