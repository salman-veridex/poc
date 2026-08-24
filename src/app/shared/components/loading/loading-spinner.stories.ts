import type { Meta, StoryObj } from '@storybook/angular-vite';
import { LoadingSpinnerComponent } from './loading-spinner.component';

const meta: Meta<LoadingSpinnerComponent> = {
  title: 'Shared UI/Loading Spinner',
  component: LoadingSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    inline: { control: 'boolean' },
    fullscreen: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<LoadingSpinnerComponent>;

export const MediumSpinner: Story = {
  args: {
    message: 'Recalculating actuarial risk score...',
    size: 'md',
    inline: false,
    fullscreen: false
  }
};

export const SmallInline: Story = {
  args: {
    message: 'Saving draft...',
    size: 'sm',
    inline: true,
    fullscreen: false
  }
};
