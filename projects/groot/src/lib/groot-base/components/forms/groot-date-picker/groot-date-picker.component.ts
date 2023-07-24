import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, FormControlDirective, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {
  BsLocaleService,
  BsDatepickerConfig,
  BsDatepickerDirective,
  BsDatepickerInputDirective,
  DatepickerDateCustomClasses
} from 'ngx-bootstrap/datepicker';
import {calculateDatePickerPosition, Placement} from './groot-date-picker-placement.utils';
import {convertNgAngularPipeDateFormatToNgBootstrapFormat, normalizeNgBootstrapDateFormat} from './groot-date-picker-config';
import {DatePipe} from '@angular/common';
import {getLocale, parseDate, utcAsLocal} from 'ngx-bootstrap/chronos';

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
export class GrootDatePickerComponent implements ControlValueAccessor, AfterViewInit {
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string | null = null;
  @Input() formControl: UntypedFormControl | null = null;
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
  @ViewChild('formControlDirective') private formControlDirective: FormControlDirective;
  @ViewChild('input') input: NgModel;
  @ViewChild('inputElement') inputElement: ElementRef;
  private bsDatepickerInputDirective: BsDatepickerInputDirective;
  private inputFormat: string;
  private bsDatepickerFormat: string;

  // different formats needed: one for Angular pipe, one for NgBootstrap
  @Input('format') set format(format: string) {
    if (format) {
      this.inputFormat = normalizeNgBootstrapDateFormat(format);
      this.bsDatepickerFormat = convertNgAngularPipeDateFormatToNgBootstrapFormat(format);
    }
  }

  // tslint:disable-next-line:variable-name
  constructor(private _element: ElementRef,
              private changeDetectorRef: ChangeDetectorRef,
              private bsDatepickerConfig: BsDatepickerConfig,
              private bsLocaleService: BsLocaleService,
              private datePipe: DatePipe) {
    this.inputFormat = normalizeNgBootstrapDateFormat(bsDatepickerConfig.dateInputFormat);
    this.bsDatepickerFormat = convertNgAngularPipeDateFormatToNgBootstrapFormat(this.inputFormat);
  }

  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.disabled) {
      return;
    }
    this.onToggle();
  }

  private onToggle(): void {
    this.placement = calculateDatePickerPosition(this._element);
    // Wait for the nex javascript execution cycle, in this way the component read the updated input value.
    setTimeout(() => {
      this.datePickerDirective.toggle();
      this.onTouched();
    }, 0);
  }

  // noinspection JSUnusedLocalSymbols
  onChange = (selectedDate: Date) => null;
  onTouched = () => null;

  writeValue(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(selectedDate: Date): void {
    this.writeValue(selectedDate);
    this.onChange(this.selectedDate);
  }

  ngAfterViewInit(): void {
    this.bsDatepickerInputDirective = this.input ?
      this.input.valueAccessor as BsDatepickerInputDirective :
      this.formControlDirective.valueAccessor as BsDatepickerInputDirective;
    this.hackBsDatepicker(this.bsDatepickerInputDirective);
  }

  registerOnChange(fn: (selectedDate: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.datePickerDirective.hide();
  }

  private hackBsDatepicker(bsDatepickerInputDirective: BsDatepickerInputDirective): void {
    // this is needed because of a design error of this component:
    // we used the angular date pipe instead of ngx boostrap date config, and they use different format tokens
    bsDatepickerInputDirective._setInputValue = value => {
      this.writeInput(value);
    };
    // this is needed because sometimes bsDatepicker is able to write to the input field before ngAfterViewInit
    this.writeInput(this.selectedDate);

    // this is needed to fix a bug in ngx bootstrap: code is copied from ngx boostrap
    // except the first check that set the value to null if an invalid string|Date is given as input
    bsDatepickerInputDirective.writeValue = value => {
      const self = (bsDatepickerInputDirective as any);
      if (!value || !this.checkDate(value)) {
        self._value = null;
      } else {
        // tslint:disable-next-line:variable-name
        const _localeKey = self._localeService.currentLocale;
        // tslint:disable-next-line:variable-name
        const _locale = getLocale(_localeKey);
        if (!_locale) {
          throw new Error(`Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`);
        }
        self._value = parseDate(value, this.bsDatepickerFormat, self._localeService.currentLocale);
        if (self._picker._config.useUtc) {
          self._value = utcAsLocal(self._value);
        }
      }
      self._picker.bsValue = self._value;
    };
  }

  private checkDate(value: any): boolean {
    return (value instanceof Date && !isNaN(value.getTime()))
      || !isNaN(Date.parse(parseDate(value, this.bsDatepickerFormat, this.bsLocaleService.currentLocale, true).toString()));
  }

  private writeInput(value: any): void {
    if (value && this.checkDate(value)) {
      this.inputElement.nativeElement.value = this.datePipe.transform(value, this.inputFormat);
    } else {
      this.inputElement.nativeElement.value = null;
    }
  }
}
