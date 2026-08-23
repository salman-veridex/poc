import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

export interface UploadedFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vx-upload-container">
      <div
        class="vx-dropzone"
        [class.is-dragover]="isDragOver()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="fileInput.click()">
        <input
          #fileInput
          type="file"
          [multiple]="multiple"
          [accept]="accept"
          (change)="onFileSelected($event)"
          style="display: none"
        />
        <div class="vx-dropzone-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div class="vx-dropzone-text">
          <span class="primary-text">Click to upload or drag & drop</span>
          <span class="sub-text">{{ helpText || 'PDF, DOCX, PNG or JPG (up to 25MB each)' }}</span>
        </div>
      </div>

      @if (files().length > 0) {
        <div class="vx-file-list">
          @for (item of files(); track item.id) {
            <div class="vx-file-item">
              <div class="vx-file-info">
                <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <div class="file-meta">
                  <span class="file-name">{{ item.name }}</span>
                  <span class="file-size">{{ (item.size / 1024 / 1024).toFixed(2) }} MB</span>
                </div>
              </div>

              <div class="vx-file-actions">
                @if (item.status === 'completed') {
                  <span class="badge-success-text">Ready</span>
                }
                <button class="remove-btn" (click)="removeFile(item.id, $event)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .vx-upload-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .vx-dropzone {
      border: 2px dashed var(--vx-border-medium);
      border-radius: var(--vx-radius-lg);
      padding: 24px 16px;
      text-align: center;
      background-color: var(--vx-bg-subtle);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.15s ease;

      &:hover, &.is-dragover {
        border-color: var(--vx-brand-primary);
        background-color: var(--vx-brand-primary-light);
      }

      .vx-dropzone-icon {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background-color: #ffffff;
        border: 1px solid var(--vx-border-subtle);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--vx-brand-primary);

        svg { width: 18px; height: 18px; }
      }

      .vx-dropzone-text {
        display: flex;
        flex-direction: column;
        line-height: 1.4;

        .primary-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--vx-text-primary);
        }

        .sub-text {
          font-size: 11.5px;
          color: var(--vx-text-muted);
        }
      }
    }

    .vx-file-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .vx-file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background-color: #ffffff;
      border: 1px solid var(--vx-border-subtle);
      border-radius: var(--vx-radius-md);

      .vx-file-info {
        display: flex;
        align-items: center;
        gap: 10px;

        .file-icon {
          width: 16px;
          height: 16px;
          color: var(--vx-brand-primary);
        }

        .file-meta {
          display: flex;
          flex-direction: column;

          .file-name {
            font-size: 12px;
            font-weight: 600;
            color: var(--vx-text-primary);
          }

          .file-size {
            font-size: 10.5px;
            color: var(--vx-text-muted);
          }
        }
      }

      .vx-file-actions {
        display: flex;
        align-items: center;
        gap: 8px;

        .badge-success-text {
          font-size: 11px;
          color: var(--vx-success);
          font-weight: 600;
        }

        .remove-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--vx-text-muted);
          display: flex;
          align-items: center;

          svg { width: 14px; height: 14px; }

          &:hover { color: var(--vx-danger); }
        }
      }
    }
  `]
})
export class FileUploadComponent {
  @Input() multiple = true;
  @Input() accept = '.pdf,.docx,.doc,.png,.jpg,.jpeg,.xlsx,.csv';
  @Input() helpText?: string;
  @Input() maxFileSizeMb = 25;

  @Output() filesChanged = new EventEmitter<UploadedFileItem[]>();

  isDragOver = signal(false);
  files = signal<UploadedFileItem[]>([]);

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  private handleFiles(fileList: FileList): void {
    const newItems: UploadedFileItem[] = Array.from(fileList).map(file => ({
      id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 100,
      status: 'completed'
    }));

    const updated = this.multiple ? [...this.files(), ...newItems] : newItems;
    this.files.set(updated);
    this.filesChanged.emit(updated);
  }

  removeFile(id: string, event: MouseEvent): void {
    event.stopPropagation();
    const filtered = this.files().filter(f => f.id !== id);
    this.files.set(filtered);
    this.filesChanged.emit(filtered);
  }
}
