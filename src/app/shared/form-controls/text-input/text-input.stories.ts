import type { Meta, StoryObj } from '@storybook/angular';
import { TextInputComponent } from './text-input.component';

const meta: Meta<TextInputComponent> = {
  title: 'Form Controls/Text Input',
  component: TextInputComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    error: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel']
    }
  }
};

export default meta;
type Story = StoryObj<TextInputComponent>;

export const DefaultInput: Story = {
  args: {
    label: 'Primary Named Insured Entity',
    placeholder: 'e.g. Acme Logistics Global LLC',
    required: true,
    hint: 'Enter full legal corporate entity name registered with state regulator'
  }
};

export const WithValidationError: Story = {
  args: {
    label: 'Corporate Email Address',
    placeholder: 'underwriter@carrier.insurance',
    required: true,
    error: 'Please provide a valid company email address'
  }
};
