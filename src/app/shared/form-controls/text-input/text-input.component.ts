import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
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

      <div class="vx-input-wrapper">
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onBlur()"
          class="vx-input"
        />
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
    .vx-input {
      width: 100%;
      height: 34px;
      padding: 0 10px;
      font-size: 12.5px;
      border: 1px solid var(--vx-border-medium);
      border-radius: var(--vx-radius-md);
      background-color: #ffffff;
      color: var(--vx-text-primary);
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
    .has-error .vx-input {
      border-color: var(--vx-danger);
      background-color: #fef2f2;
    }
    .vx-hint { font-size: 11px; color: var(--vx-text-muted); }
    .vx-error-text { font-size: 11px; color: var(--vx-danger); font-weight: 500; }
  `]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() id = `input_${Math.random().toString(36).substring(2, 7)}`;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'tel' = 'text';
  @Input() required = false;
  @Input() hint?: string;
  @Input() error?: string;

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

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  onBlur(): void {
    this.onTouched();
  }
}
