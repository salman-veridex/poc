import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Form Controls/Checkbox & Toggle',
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const TerrorismEndorsementOption: Story = {
  args: {
    label: 'TRIA (Terrorism Risk Insurance Act) Coverage',
    description: 'Attach federal certified acts of terrorism endorsement per TRIA disclosures.'
  }
};

export const AutoReinstatementOption: Story = {
  args: {
    label: 'Automatic Limit Reinstatement',
    description: 'Automatically reinstate aggregate policy limits following first paid loss.'
  }
};
