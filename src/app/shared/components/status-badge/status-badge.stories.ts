import type { Meta, StoryObj } from '@storybook/angular-vite';
import { StatusBadgeComponent } from './status-badge.component';

const meta: Meta<StatusBadgeComponent> = {
  title: 'Shared UI/Status Badge',
  component: StatusBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'active',
        'bound',
        'issued',
        'approved',
        'pending',
        'in-review',
        'submitted',
        'draft',
        'referred',
        'cancelled',
        'rejected',
        'closed',
        'expired',
        'info',
        'purple'
      ]
    },
    status: { control: 'text' },
    label: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<StatusBadgeComponent>;

export const Active: Story = {
  args: {
    status: 'ACTIVE',
    label: 'Active Policy'
  }
};

export const Bound: Story = {
  args: {
    status: 'BOUND',
    label: 'Firm Bound'
  }
};

export const InReview: Story = {
  args: {
    status: 'IN_REVIEW',
    label: 'Underwriter Review'
  }
};

export const Referred: Story = {
  args: {
    status: 'REFERRED',
    label: 'Referral Authority Escalate'
  }
};

export const Cancelled: Story = {
  args: {
    status: 'CANCELLED',
    label: 'Cancelled (Pro-Rata)'
  }
};
