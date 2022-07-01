import {ChangeDetectorRef, Component, ElementRef, forwardRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {BsDatepickerConfig, BsDatepickerDirective} from 'ngx-bootstrap/datepicker';
import {isoDate} from '../../../utils/date-utils';
import {leftPad} from '../../../utils/string-utils';
import {Subscription} from 'rxjs';
import {unsubscribeSafe} from '../../../utils/subscription-utils';
import {calculateDatePickerPosition, Placement} from '../groot-date-picker/groot-date-picker-placement.utils';
import {normalizeNgBootstrapDateFormat} from '../groot-date-picker/groot-date-picker-config';

@Component({
  selector: 'groot-date-time-picker',
  templateUrl: './groot-date-time-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootDateTimePickerComponent),
      multi: true
    }
  ]
})
export class GrootDateTimePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string | null = null;
  // tslint:disable-next-line:no-input-rename
  @Input('formControl') externalFormControl: FormControl = null;
  @Input() format: string;
  @Input() forcedFormat = false;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() minTime: string | null = null;
  @Input() maxTime: string | null = null;
  @Input() step: number | null | undefined = 1;
  @Input() daysDisabled: number[] | null = null;
  @Input() datesDisabled: Date[] | null = null;
  @Input() datesEnabled: Date[] | null = null;
  @Input() hidePlaceholder = false;
  @ViewChild('datePickerDirective') private datePickerDirective: BsDatepickerDirective;
  @ViewChild('datePickerElement') private datePickerElement: ElementRef;
  @ViewChild('inputDate') input: NgModel;

  selectedDate: Date;
  timePart: string;
  private subValue: Subscription;
  private subStatus: Subscription;
  valid = false;
  touched = false;
  placement: Placement;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              bsDatepickerConfig: BsDatepickerConfig) {
    this.format = normalizeNgBootstrapDateFormat(bsDatepickerConfig.dateInputFormat);
  }

  private getTzOffset(date: string): string {
    // Compute offset from UTC to local zone. We need it to invoke the new Date/toIsoDate methods correctly
    const minutesTz = new Date(date).getTimezoneOffset();
    const hh = Math.abs(minutesTz / 60);
    const mm = Math.abs(minutesTz) % 60;
    const sign = hh > 0 ? '+' : '-';
    return sign + leftPad(hh, 2, '0') + ':' + leftPad(mm, 2, '0');
  }

  @HostListener('click', ['$event'])
  touch(event: Event): void {
    this.touched = true;
    this.computeValidity();
  }

  clickOnDate(): void {
    this.placement = calculateDatePickerPosition(this.datePickerElement);
    // Wait for the nex javascript execution cycle, in this way the component read the updated input value.
    setTimeout(() => {
      this.datePickerDirective.toggle();
      this.onTouched();
    }, 0);
  }

  ngOnInit(): void {
    if (this.externalFormControl) {
      this.subValue = this.externalFormControl.valueChanges
        .subscribe(ev => this.setValueFromExternalFc(ev as Date));
      this.setValueFromExternalFc(this.externalFormControl.value as Date);

      this.subStatus = this.externalFormControl.statusChanges
        .subscribe(st => this.setValidFromFormControl(st as string));
      this.setValidFromFormControl(this.externalFormControl.status);
    }
  }

  ngOnDestroy(): void {
    unsubscribeSafe(this.subValue);
    unsubscribeSafe(this.subStatus);
  }

  private setValueFromExternalFc(value: Date): void {
    this.writeValue(value);
  }

  private setValidFromFormControl(status: string): void {
    this.valid = status === 'VALID' || !this.touched;
  }

  onChange = (selectedDate: Date) => null;
  onTouched = () => null;

  writeValue(dateValue: Date): void {
    if (dateValue === this.selectedDate) {
      return;
    }

    this.selectedDate = dateValue;

    if (dateValue) {
      this.timePart =
        leftPad(dateValue.getHours(), 2, '0') + ':' +
        leftPad(dateValue.getMinutes(), 2, '0') + ':' +
        leftPad(dateValue.getSeconds(), 2, '0');
    } else {
      this.timePart = null;
    }

    this.computeValidity();

    this.changeDetectorRef.detectChanges();
  }

  private computeValidity(): void {
    if (!this.externalFormControl) {
      this.valid = this.required && this.touched ? Boolean(this.selectedDate) : true;
    } else {
      this.setValidFromFormControl(this.externalFormControl.status);
    }
  }

  writeDateFromGui(datePart: Date | null): void {
    if (!datePart) {
      this.selectedDate = null;
      this.timePart = null;
    } else {
      const dateOnly = isoDate(datePart);
      const dateTimeStr = dateOnly + 'T' + (this.timePart || '00:00:00') + this.getTzOffset(dateOnly);
      this.selectedDate = new Date(dateTimeStr);
      // No need to change the time part
    }

    this.touched = true;
    this.computeValidity();

    this.onChange(this.selectedDate);
  }

  writeTimeFromGui(timePart: string): void {
    if (this.selectedDate) {
      const dateOnly = isoDate(this.selectedDate);
      const dateTimeStr = dateOnly + 'T' + (timePart || '00:00:00') + this.getTzOffset(dateOnly);
      this.selectedDate = new Date(dateTimeStr);

      this.touched = true;
      this.computeValidity();

      this.onChange(this.selectedDate);
    }
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
