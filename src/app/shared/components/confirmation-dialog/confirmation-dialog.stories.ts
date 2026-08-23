import type { Meta, StoryObj } from '@storybook/angular';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const meta: Meta<ConfirmationDialogComponent> = {
  title: 'Shared UI/Confirmation Dialog',
  component: ConfirmationDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    confirmText: { control: 'text' },
    cancelText: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['danger', 'warning', 'info']
    }
  }
};

export default meta;
type Story = StoryObj<ConfirmationDialogComponent>;

export const DangerCancellation: Story = {
  args: {
    isOpen: true,
    title: 'Cancel Active Policy Schedule?',
    message: 'Are you sure you want to cancel Policy #POL-US-2026-89421? Notice of Cancellation (NOC) will be issued to all named insureds and lienholders.',
    confirmText: 'Confirm Policy Cancellation',
    cancelText: 'Keep Policy Active',
    variant: 'danger'
  }
};

export const WarningAction: Story = {
  args: {
    isOpen: true,
    title: 'Re-Rate Unbound Quote',
    message: 'Re-rating this submission will invalidate previously offered premium tiers and recalculate exposure rating factors.',
    confirmText: 'Proceed to Re-Rate',
    cancelText: 'Cancel',
    variant: 'warning'
  }
};
