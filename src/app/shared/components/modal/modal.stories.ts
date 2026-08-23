import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Shared UI/Modal Dialog',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full']
    },
    showFooter: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' }
  },
  render: (args) => ({
    props: args,
    template: `
      <app-modal [isOpen]="isOpen" [title]="title" [subtitle]="subtitle" [size]="size" [showFooter]="showFooter">
        <p style="color: #334155; font-size: 13px; line-height: 1.6;">
          Underwriter review is required before binding this commercial property schedule.
          Ensure all hurricane and flood sub-limits match the reinsurer treaty requirements.
        </p>
        <div modalFooter>
          <button style="padding: 6px 14px; border: 1px solid #cbd5e1; border-radius: 4px; background: white; cursor: pointer;">Cancel</button>
          <button style="padding: 6px 14px; background: #0052cc; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Confirm Approval</button>
        </div>
      </app-modal>
    `
  })
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const MediumModal: Story = {
  args: {
    isOpen: true,
    title: 'Underwriting Authority Escalation',
    subtitle: 'Transaction #POL-US-2026-89421',
    size: 'md',
    showFooter: true
  }
};

export const LargeModal: Story = {
  args: {
    isOpen: true,
    title: 'Commercial Property Schedule & Endorsement Details',
    subtitle: 'Nexus Renewable Energy Inc',
    size: 'lg',
    showFooter: true
  }
};
