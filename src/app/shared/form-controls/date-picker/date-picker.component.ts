import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
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

      <div class="vx-date-wrapper">
        <input
          type="date"
          [id]="id"
          [disabled]="disabled"
          [value]="value"
          [min]="min"
          [max]="max"
          (input)="onDateInput($event)"
          (blur)="onBlur()"
          class="vx-date-input"
        />
        <svg class="vx-calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
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
    .vx-date-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .vx-date-input {
      width: 100%;
      height: 34px;
      padding: 0 32px 0 10px;
      font-size: 12.5px;
      border: 1px solid var(--vx-border-medium);
      border-radius: var(--vx-radius-md);
      background-color: #ffffff;
      color: var(--vx-text-primary);
      font-family: inherit;
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
    .vx-calendar-icon {
      position: absolute;
      right: 10px;
      width: 15px;
      height: 15px;
      color: var(--vx-text-muted);
      pointer-events: none;
    }
    .has-error .vx-date-input {
      border-color: var(--vx-danger);
      background-color: #fef2f2;
    }
    .vx-hint { font-size: 11px; color: var(--vx-text-muted); }
    .vx-error-text { font-size: 11px; color: var(--vx-danger); font-weight: 500; }
  `]
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() id = `date_${Math.random().toString(36).substring(2, 7)}`;
  @Input() label?: string;
  @Input() required = false;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() min?: string;
  @Input() max?: string;

  value = '';
  disabled = false;

  onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string): void {
    this.value = val ?? '';
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  onBlur(): void {
    this.onTouched();
  }
}
