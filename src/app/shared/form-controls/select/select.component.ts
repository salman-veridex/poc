import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="vx-form-group" [class.has-error]="!!error">
      @if (label) {
        <label [for]="id" class="vx-label">
          {{ label }}
          @if (required) { <span class="required-star">*</span> }
        </label>
      }

      <div class="vx-select-wrapper">
        <select
          [id]="id"
          [disabled]="disabled"
          [value]="value"
          (change)="onSelectChange($event)"
          (blur)="onBlur()"
          class="vx-select">
          @if (placeholder) {
            <option value="" disabled selected>{{ placeholder }}</option>
          }
          @for (opt of options; track opt.value) {
            <option [value]="opt.value" [disabled]="opt.disabled">{{ opt.label }}</option>
          }
        </select>
        <svg class="vx-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      @if (hint && !error) {
        <span class="vx-hint">{{ hint }}</span>
      }
      @if (error) {
        <span class="vx-error-text">{{ error }}</span>
      }
    </div>
  `,
  styles: [`
    .vx-form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
      width: 100%;
    }
    .vx-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--vx-text-primary);
      .required-star { color: var(--vx-danger); }
    }
    .vx-select-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .vx-select {
      width: 100%;
      height: 34px;
      padding: 0 30px 0 10px;
      font-size: 12.5px;
      border: 1px solid var(--vx-border-medium);
      border-radius: var(--vx-radius-md);
      background-color: #ffffff;
      color: var(--vx-text-primary);
      appearance: none;
      transition: all 0.15s ease;
      &:focus {
        outline: none;
        border-color: var(--vx-brand-primary);
        box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.15);
      }
      &:disabled {
        background-color: var(--vx-bg-hover);
        cursor: not-allowed;
      }
    }
    .vx-select-chevron {
      position: absolute;
      right: 10px;
      width: 14px;
      height: 14px;
      color: var(--vx-text-muted);
      pointer-events: none;
    }
    .has-error .vx-select {
      border-color: var(--vx-danger);
      background-color: #fef2f2;
    }
    .vx-hint { font-size: 11px; color: var(--vx-text-muted); }
    .vx-error-text { font-size: 11px; color: var(--vx-danger); font-weight: 500; }
  `]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() id = `select_${Math.random().toString(36).substring(2, 7)}`;
  @Input() label?: string;
  @Input() placeholder = 'Select an option...';
  @Input() options: SelectOption[] = [];
  @Input() required = false;
  @Input() hint?: string;
  @Input() error?: string;

  value: string | number = '';
  disabled = false;

  onChange: (val: string | number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string | number): void {
    this.value = val ?? '';
  }

  registerOnChange(fn: (val: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.value = val;
    this.onChange(val);
  }

  onBlur(): void {
    this.onTouched();
  }
}
