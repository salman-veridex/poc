import type { Meta, StoryObj } from '@storybook/angular-vite';
import { FileUploadComponent } from './file-upload.component';

const meta: Meta<FileUploadComponent> = {
  title: 'Shared UI/File Upload',
  component: FileUploadComponent,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    helpText: { control: 'text' },
    maxFileSizeMb: { control: 'number' }
  }
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const DefaultIntakeDropzone: Story = {
  args: {
    multiple: true,
    accept: '.pdf,.docx,.xlsx,.csv',
    helpText: 'Attach SOV Schedule of Values, Loss Runs or ACORD 125 forms (Max 25MB)',
    maxFileSizeMb: 25
  }
};
