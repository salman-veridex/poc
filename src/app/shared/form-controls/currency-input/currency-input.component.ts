import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
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

      <div class="vx-currency-wrapper">
        <span class="vx-currency-symbol">{{ currencySymbol }}</span>
        <input
          type="number"
          [id]="id"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value !== null ? value : ''"
          [min]="min"
          [max]="max"
          [step]="step"
          (input)="onNumberInput($event)"
          (blur)="onBlur()"
          class="vx-currency-input"
        />
        <span class="vx-currency-code">{{ currencyCode }}</span>
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
    .vx-currency-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .vx-currency-symbol {
      position: absolute;
      left: 10px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--vx-text-muted);
      pointer-events: none;
    }
    .vx-currency-code {
      position: absolute;
      right: 10px;
      font-size: 10.5px;
      font-weight: 700;
      color: var(--vx-text-muted);
      letter-spacing: 0.05em;
      pointer-events: none;
    }
    .vx-currency-input {
      width: 100%;
      height: 34px;
      padding: 0 42px 0 24px;
      font-size: 12.5px;
      border: 1px solid var(--vx-border-medium);
      border-radius: var(--vx-radius-md);
      background-color: #ffffff;
      color: var(--vx-text-primary);
      text-align: right;
      font-variant-numeric: tabular-nums;
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
    .has-error .vx-currency-input {
      border-color: var(--vx-danger);
      background-color: #fef2f2;
    }
    .vx-hint { font-size: 11px; color: var(--vx-text-muted); }
    .vx-error-text { font-size: 11px; color: var(--vx-danger); font-weight: 500; }
  `]
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @Input() id = `curr_${Math.random().toString(36).substring(2, 7)}`;
  @Input() label?: string;
  @Input() placeholder = '0.00';
  @Input() currencySymbol = '$';
  @Input() currencyCode = 'USD';
  @Input() required = false;
  @Input() min = 0;
  @Input() max?: number;
  @Input() step = '0.01';
  @Input() hint?: string;
  @Input() error?: string;

  value: number | null = null;
  disabled = false;

  onChange: (val: number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: number | null): void {
    this.value = val !== undefined ? val : null;
  }

  registerOnChange(fn: (val: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onNumberInput(event: Event): void {
    const rawVal = (event.target as HTMLInputElement).value;
    const numVal = rawVal === '' ? null : parseFloat(rawVal);
    this.value = numVal;
    this.onChange(numVal);
  }

  onBlur(): void {
    this.onTouched();
  }
}
