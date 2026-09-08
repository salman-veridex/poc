import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DrawerComponent } from './drawer.component';

const meta: Meta<DrawerComponent> = {
  title: 'Shared UI/Side Drawer',
  component: DrawerComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    showFooter: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <app-drawer [isOpen]="isOpen" [title]="title" [subtitle]="subtitle" [size]="size" [showFooter]="showFooter">
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 13px; color: #334155;">
          <div><strong>Line of Business:</strong> Cyber Risk & Tech E&O</div>
          <div><strong>Requested Limit:</strong> $10,000,000 Aggregate</div>
          <div><strong>Primary Retention:</strong> $100,000 Each Loss</div>
          <div><strong>Underwriter Notes:</strong> Prior claims history verified clean over past 5 years. Ransomware endorsement attached.</div>
        </div>
        <div drawerFooter>
          <button style="padding: 6px 14px; border: 1px solid #cbd5e1; border-radius: 4px; background: white; cursor: pointer;">Close</button>
          <button style="padding: 6px 14px; background: #0052cc; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Save Endorsement</button>
        </div>
      </app-drawer>
    `,
  }),
};

export default meta;
type Story = StoryObj<DrawerComponent>;

export const MediumDrawer: Story = {
  args: {
    isOpen: true,
    title: 'Submission Triage Quick View',
    subtitle: 'SUB-2026-8812 - Apex Industrial Dynamics',
    size: 'md',
    showFooter: true,
  },
};
