import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  template: `
    <div class="vx-checkbox-group">
      <label [for]="id" class="vx-checkbox-label">
        <input
          type="checkbox"
          [id]="id"
          [disabled]="disabled"
          [checked]="value"
          (change)="onCheckboxChange($event)"
          (blur)="onBlur()"
          class="vx-checkbox-input"
        />
        <span class="vx-custom-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
        <span class="vx-checkbox-text">
          <span class="main-label">{{ label }}</span>
          @if (description) {
            <span class="sub-desc">{{ description }}</span>
          }
        </span>
      </label>
      @if (error) {
        <span class="vx-error-text">{{ error }}</span>
      }
    </div>
  `,
  styles: [`
    .vx-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-bottom: 8px;
    }
    .vx-checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .vx-checkbox-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .vx-custom-box {
      width: 16px;
      height: 16px;
      border: 1px solid var(--vx-border-medium);
      border-radius: var(--vx-radius-sm);
      background-color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 2px;
      transition: all 0.15s ease;
      flex-shrink: 0;

      svg {
        width: 11px;
        height: 11px;
        color: #ffffff;
        opacity: 0;
        transform: scale(0.6);
        transition: all 0.15s ease;
      }
    }
    .vx-checkbox-input:checked ~ .vx-custom-box {
      background-color: var(--vx-brand-primary);
      border-color: var(--vx-brand-primary);
      svg {
        opacity: 1;
        transform: scale(1);
      }
    }
    .vx-checkbox-input:focus ~ .vx-custom-box {
      box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.2);
    }
    .vx-checkbox-input:disabled ~ .vx-custom-box {
      background-color: var(--vx-bg-hover);
      cursor: not-allowed;
    }
    .vx-checkbox-text {
      display: flex;
      flex-direction: column;
      line-height: 1.35;
      .main-label {
        font-size: 12.5px;
        font-weight: 500;
        color: var(--vx-text-primary);
      }
      .sub-desc {
        font-size: 11px;
        color: var(--vx-text-muted);
      }
    }
    .vx-error-text { font-size: 11px; color: var(--vx-danger); }
  `]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id = `chk_${Math.random().toString(36).substring(2, 7)}`;
  @Input() label = '';
  @Input() description?: string;
  @Input() error?: string;

  value = false;
  disabled = false;

  onChange: (val: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: boolean): void {
    this.value = !!val;
  }

  registerOnChange(fn: (val: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onCheckboxChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.value = isChecked;
    this.onChange(isChecked);
  }

  onBlur(): void {
    this.onTouched();
  }
}
