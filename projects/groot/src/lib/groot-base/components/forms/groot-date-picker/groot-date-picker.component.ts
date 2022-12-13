import {ChangeDetectorRef, Component, ElementRef, forwardRef, HostListener, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {BsDatepickerConfig, BsDatepickerDirective, DatepickerDateCustomClasses} from 'ngx-bootstrap/datepicker';
import {calculateDatePickerPosition, Placement} from './groot-date-picker-placement.utils';
import {normalizeNgBootstrapDateFormat} from './groot-date-picker-config';

@Component({
  selector: 'groot-date-picker',
  templateUrl: './groot-date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootDatePickerComponent),
      multi: true
    }
  ],
  styles: [`:host {
    display: block;
  }`],
})
export class GrootDatePickerComponent implements ControlValueAccessor {
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string | null = null;
  @Input() formControl: FormControl | null = null;
  @Input() format: string;
  @Input() forcedFormat = false;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() daysDisabled: number[] | null = null;
  @Input() datesDisabled: Date[] | null = null;
  @Input() datesEnabled: Date[] | null = null;
  @Input() dateCustomClasses: DatepickerDateCustomClasses[] | null = null;
  @Input() hidePlaceholder = false;
  @Input() errorMessage = 'common.required';
  placement: Placement = 'bottom';
  selectedDate: Date;
  @ViewChild('datePickerDirective') private datePickerDirective: BsDatepickerDirective;
  @ViewChild('input') input: NgModel;

  constructor(private _element: ElementRef,
              private changeDetectorRef: ChangeDetectorRef,
              bsDatepickerConfig: BsDatepickerConfig) {
    this.format = normalizeNgBootstrapDateFormat(bsDatepickerConfig.dateInputFormat);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.onToggle();
  }

  private onToggle() {
    this.placement = calculateDatePickerPosition(this._element);
    // Wait for the nex javascript execution cycle, in this way the component read the updated input value.
    setTimeout(() => {
      this.datePickerDirective.toggle();
      this.onTouched();
    }, 0);
  }

  onChange = (selectedDate: Date) => null;
  onTouched = () => null;

  writeValue(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(selectedDate: Date) {
    this.writeValue(selectedDate);
    this.onChange(this.selectedDate);
  }

  registerOnChange(fn: (selectedDate: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
