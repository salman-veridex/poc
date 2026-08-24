import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, forwardRef, ElementRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-datepicker.component.html',
  styleUrl: './app-datepicker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDatepickerComponent),
      multi: true
    }
  ]
})
export class AppDatepickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  private elementRef = inject(ElementRef);

  // ====================================================================================
  // 🚀 [CLIENT DEMO TOGGLE]: Switch the UI Design Variant without touching consumer code!
  // 'classic'      -> Native Enterprise Input controls
  // 'modern-popup' -> Custom Floating Interactive Calendar & Time Picker UI
  @Input() variant: 'classic' | 'modern-popup' = 'modern-popup';

  @Input('modern-popup')
  set isModernPopup(val: boolean | string) {
    if (val !== false && val !== 'false') {
      this.variant = 'modern-popup';
    }
  }

  @Input('modernPopup')
  set isModernPopupCamel(val: boolean | string) {
    if (val !== false && val !== 'false') {
      this.variant = 'modern-popup';
    }
  }

  @Input('classic')
  set isClassic(val: boolean | string) {
    if (val !== false && val !== 'false') {
      this.variant = 'classic';
    }
  }

  @Input() id: string = `dp_${Math.random().toString(36).substring(2, 9)}`;
  @Input() label: string = '';
  @Input() startYear: number = 1970;
  @Input() endYear: number = new Date().getFullYear() + 10;
  @Input() enableTime: boolean = false;
  @Input() minDate?: string | Date;
  @Input() maxDate?: string | Date;
  @Input() errorMessage: string = '';
  @Input() hint?: string;
  @Input() placeholder?: string;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  // Internal Form Model State
  datePart: string = '';
  timePart: string = '00:00';

  // Popup & Custom Calendar State
  isPopupOpen: boolean = false;
  viewMonth: number = new Date().getMonth();
  viewYear: number = new Date().getFullYear();
  calendarDays: CalendarDay[] = [];

  readonly monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  readonly weekDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  yearList: number[] = [];

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.syncInitialViewDate();
    this.generateYearList();
    this.generateCalendarGrid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startYear'] || changes['endYear'] || changes['minDate'] || changes['maxDate']) {
      this.syncInitialViewDate();
      this.generateYearList();
      this.generateCalendarGrid();
    }
  }

  // Close popup when clicking outside the component
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isPopupOpen = false;
    }
  }

  /**
   * Effective starting year combining startYear and minDate
   */
  get effectiveStartYear(): number {
    if (this.minDate) {
      const minYear = Number(this.formatToDateOnly(this.minDate).split('-')[0]);
      return Math.max(this.startYear, minYear);
    }
    return this.startYear;
  }

  /**
   * Effective ending year combining endYear and maxDate
   */
  get effectiveEndYear(): number {
    if (this.maxDate) {
      const maxYear = Number(this.formatToDateOnly(this.maxDate).split('-')[0]);
      return Math.min(this.endYear, maxYear);
    }
    return this.endYear;
  }

  /**
   * Computed minimum date string conforming to YYYY-MM-DD
   */
  get minDateString(): string {
    if (this.minDate) {
      return this.formatToDateOnly(this.minDate);
    }
    return `${this.effectiveStartYear}-01-01`;
  }

  /**
   * Computed maximum date string conforming to YYYY-MM-DD
   */
  get maxDateString(): string {
    if (this.maxDate) {
      return this.formatToDateOnly(this.maxDate);
    }
    return `${this.effectiveEndYear}-12-31`;
  }

  get isPrevMonthDisabled(): boolean {
    if (!this.minDateString) return false;
    const [minY, minM] = this.minDateString.split('-').map(Number);
    return this.viewYear < minY || (this.viewYear === minY && this.viewMonth <= minM - 1);
  }

  get isNextMonthDisabled(): boolean {
    if (!this.maxDateString) return false;
    const [maxY, maxM] = this.maxDateString.split('-').map(Number);
    return this.viewYear > maxY || (this.viewYear === maxY && this.viewMonth >= maxM - 1);
  }

  get formattedDisplayValue(): string {
    if (!this.datePart) {
      return this.placeholder || 'Select Date & Time...';
    }
    try {
      const [year, month, day] = this.datePart.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      return this.enableTime ? `${formattedDate} at ${this.timePart}` : formattedDate;
    } catch {
      return this.datePart;
    }
  }

  // ==========================================
  // ControlValueAccessor Implementation
  // ==========================================

  writeValue(value: string | Date | null | undefined): void {
    if (!value) {
      this.datePart = '';
      this.timePart = '00:00';
      this.syncInitialViewDate();
      this.generateCalendarGrid();
      return;
    }

    if (value instanceof Date) {
      this.datePart = value.toISOString().substring(0, 10);
      const hours = String(value.getHours()).padStart(2, '0');
      const minutes = String(value.getMinutes()).padStart(2, '0');
      this.timePart = `${hours}:${minutes}`;
    } else if (typeof value === 'string') {
      if (value.includes('T')) {
        const [d, t] = value.split('T');
        this.datePart = d;
        this.timePart = t ? t.substring(0, 5) : '00:00';
      } else {
        this.datePart = value.substring(0, 10);
        this.timePart = '00:00';
      }
    }

    if (this.datePart) {
      const [y, m] = this.datePart.split('-').map(Number);
      this.viewYear = y;
      this.viewMonth = m - 1;
    }
    this.generateCalendarGrid();
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ==========================================
  // Classic Mode Event Handlers
  // ==========================================

  onDateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    if (this.isDateDisabled(val)) {
      return;
    }
    this.datePart = val;
    this.emitValue();
  }

  onTimeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.timePart = input.value || '00:00';
    this.emitValue();
  }

  onBlur(): void {
    this.onTouched();
  }

  // ==========================================
  // Modern Popup Calendar Logic with Strict Validation
  // ==========================================

  togglePopup(): void {
    if (this.disabled) return;
    this.isPopupOpen = !this.isPopupOpen;
    if (this.isPopupOpen) {
      if (!this.datePart) {
        this.syncInitialViewDate();
      }
      this.generateYearList();
      this.generateCalendarGrid();
    } else {
      this.onTouched();
    }
  }

  prevMonth(): void {
    if (this.isPrevMonthDisabled) return;
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear--;
    } else {
      this.viewMonth--;
    }
    this.generateCalendarGrid();
  }

  nextMonth(): void {
    if (this.isNextMonthDisabled) return;
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear++;
    } else {
      this.viewMonth++;
    }
    this.generateCalendarGrid();
  }

  onMonthChange(newMonth: number): void {
    this.viewMonth = Number(newMonth);
    this.generateCalendarGrid();
  }

  onYearChange(newYear: number): void {
    this.viewYear = Number(newYear);
    this.generateCalendarGrid();
  }

  selectDay(day: CalendarDay): void {
    if (day.isDisabled) return;
    this.datePart = day.dateString;
    this.emitValue();
    this.generateCalendarGrid();
    if (!this.enableTime) {
      this.isPopupOpen = false;
    }
  }

  applySelection(): void {
    this.isPopupOpen = false;
    this.onTouched();
  }

  clearSelection(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.datePart = '';
    this.timePart = '00:00';
    this.emitValue();
    this.syncInitialViewDate();
    this.generateCalendarGrid();
  }

  // Quick Preset Handlers with Validation Checking
  selectPreset(preset: 'today' | 'tomorrow' | 'plus30' | 'endOfYear'): void {
    const now = new Date();
    let target = new Date();

    switch (preset) {
      case 'today':
        target = now;
        break;
      case 'tomorrow':
        target.setDate(now.getDate() + 1);
        break;
      case 'plus30':
        target.setDate(now.getDate() + 30);
        break;
      case 'endOfYear':
        target = new Date(this.viewYear, 11, 31);
        break;
    }

    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const d = String(target.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;

    if (this.isDateDisabled(dateStr)) {
      return;
    }

    this.viewYear = y;
    this.viewMonth = target.getMonth();
    this.datePart = dateStr;
    this.emitValue();
    this.generateCalendarGrid();
  }

  isPresetDisabled(preset: 'today' | 'tomorrow' | 'plus30' | 'endOfYear'): boolean {
    const now = new Date();
    let target = new Date();

    switch (preset) {
      case 'today':
        target = now;
        break;
      case 'tomorrow':
        target.setDate(now.getDate() + 1);
        break;
      case 'plus30':
        target.setDate(now.getDate() + 30);
        break;
      case 'endOfYear':
        target = new Date(this.viewYear, 11, 31);
        break;
    }

    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const d = String(target.getDate()).padStart(2, '0');
    return this.isDateDisabled(`${y}-${m}-${d}`);
  }

  private syncInitialViewDate(): void {
    if (this.datePart) {
      const [y, m] = this.datePart.split('-').map(Number);
      this.viewYear = y;
      this.viewMonth = m - 1;
      return;
    }

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();

    if (todayYear < this.effectiveStartYear) {
      this.viewYear = this.effectiveStartYear;
      this.viewMonth = 0;
    } else if (todayYear > this.effectiveEndYear) {
      this.viewYear = this.effectiveEndYear;
      this.viewMonth = 11;
    } else {
      this.viewYear = todayYear;
      this.viewMonth = todayMonth;
    }
  }

  private generateYearList(): void {
    const start = this.effectiveStartYear;
    const end = this.effectiveEndYear;
    this.yearList = [];
    for (let y = start; y <= end; y++) {
      this.yearList.push(y);
    }
  }

  private generateCalendarGrid(): void {
    const firstDay = new Date(this.viewYear, this.viewMonth, 1);
    const lastDay = new Date(this.viewYear, this.viewMonth + 1, 0);
    const prevMonthLastDay = new Date(this.viewYear, this.viewMonth, 0);

    const firstDayIndex = firstDay.getDay(); // 0 = Sunday
    const totalDays = lastDay.getDate();
    const prevDaysCount = prevMonthLastDay.getDate();

    const days: CalendarDay[] = [];
    const todayStr = this.formatToDateOnly(new Date());

    // 1. Previous month buffer days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevDaysCount - i;
      const d = new Date(this.viewYear, this.viewMonth - 1, dayNum);
      const str = this.formatToDateOnly(d);
      days.push({
        date: d,
        dayNumber: dayNum,
        dateString: str,
        isCurrentMonth: false,
        isToday: str === todayStr,
        isSelected: str === this.datePart,
        isDisabled: this.isDateDisabled(str)
      });
    }

    // 2. Current month active days
    for (let i = 1; i <= totalDays; i++) {
      const d = new Date(this.viewYear, this.viewMonth, i);
      const str = this.formatToDateOnly(d);
      days.push({
        date: d,
        dayNumber: i,
        dateString: str,
        isCurrentMonth: true,
        isToday: str === todayStr,
        isSelected: str === this.datePart,
        isDisabled: this.isDateDisabled(str)
      });
    }

    // 3. Next month buffer days (completing 35 or 42 grid slots)
    const remainingSlots = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingSlots; i++) {
      const d = new Date(this.viewYear, this.viewMonth + 1, i);
      const str = this.formatToDateOnly(d);
      days.push({
        date: d,
        dayNumber: i,
        dateString: str,
        isCurrentMonth: false,
        isToday: str === todayStr,
        isSelected: str === this.datePart,
        isDisabled: this.isDateDisabled(str)
      });
    }

    this.calendarDays = days;
  }

  isDateDisabled(dateStr: string): boolean {
    if (!dateStr) return true;
    if (this.minDateString && dateStr < this.minDateString) {
      return true;
    }
    if (this.maxDateString && dateStr > this.maxDateString) {
      return true;
    }
    return false;
  }

  private emitValue(): void {
    if (!this.datePart) {
      this.onChange(null);
      return;
    }

    if (this.enableTime) {
      const combined = `${this.datePart}T${this.timePart || '00:00'}:00.000Z`;
      this.onChange(combined);
    } else {
      this.onChange(this.datePart);
    }
  }

  private formatToDateOnly(val: string | Date): string {
    if (val instanceof Date) {
      const y = val.getFullYear();
      const m = String(val.getMonth() + 1).padStart(2, '0');
      const d = String(val.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    return String(val).substring(0, 10);
  }
}
