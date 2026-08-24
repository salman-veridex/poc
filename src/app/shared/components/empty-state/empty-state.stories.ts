import type { Meta, StoryObj } from '@storybook/angular-vite';
import { EmptyStateComponent } from './empty-state.component';

const meta: Meta<EmptyStateComponent> = {
  title: 'Shared UI/Empty State',
  component: EmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    actionLabel: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<EmptyStateComponent>;

export const DefaultEmpty: Story = {
  args: {
    title: 'No Pending Claim Referrals',
    message: 'All open loss files have been adjudicated within standard authority limits.',
    actionLabel: 'Create New FNOL Claim'
  }
};
