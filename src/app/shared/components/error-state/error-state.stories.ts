import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ErrorStateComponent } from './error-state.component';

const meta: Meta<ErrorStateComponent> = {
  title: 'Shared UI/Error State',
  component: ErrorStateComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    showRetry: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<ErrorStateComponent>;

export const NetworkError: Story = {
  args: {
    title: 'Policy Ledger Service Unavailable',
    message: 'Unable to reach the rating microservice. Please check your network connection or retry the request.',
    showRetry: true
  }
};
