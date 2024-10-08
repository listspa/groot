import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit, Optional, Self,
    ViewChild
} from '@angular/core';
import {UntypedFormControl, NgControl} from '@angular/forms';
import {
    BsLocaleService,
    BsDatepickerConfig,
    BsDatepickerDirective,
    BsDatepickerInputDirective,
    DatepickerDateCustomClasses
} from 'ngx-bootstrap/datepicker';
import {isoDate} from '../../../utils/date-utils';
import {leftPad} from '../../../utils/string-utils';
import {Subscription} from 'rxjs';
import {unsubscribeSafe} from '../../../utils/subscription-utils';
import {calculateDatePickerPosition, Placement} from '../groot-date-picker/groot-date-picker-placement.utils';
import {
    convertNgAngularPipeDateFormatToNgBootstrapFormat,
    normalizeNgBootstrapDateFormat
} from '../groot-date-picker/groot-date-picker-config';
import {DatePipe} from '@angular/common';
import {getLocale, parseDate, utcAsLocal} from 'ngx-bootstrap/chronos';
import {GrootBaseInput} from '../groot-base-input';

@Component({
    selector: 'groot-date-time-picker',
    templateUrl: './groot-date-time-picker.component.html',
    styles: [`:host {
        display: block;
    }`],
})
export class GrootDateTimePickerComponent extends GrootBaseInput implements OnInit, OnDestroy, AfterViewInit {
    @Input() label: string | null = null;
    @Input() placeholder: string | null = null;
    @Input() name: string;
    @Input() disabled = false;
    @Input() helpText: string | null = null;
    // tslint:disable-next-line:no-input-rename
    @Input('formControl') externalFormControl: UntypedFormControl = null;
    @Input() forcedFormat = false;
    @Input() minDate: Date | null = null;
    @Input() maxDate: Date | null = null;
    @Input() minTime: string | null = null;
    @Input() maxTime: string | null = null;
    @Input() step: number | null | undefined = 1;
    @Input() daysDisabled: number[] | null = null;
    @Input() datesDisabled: Date[] | null = null;
    @Input() datesEnabled: Date[] | null = null;
    @Input() dateCustomClasses: DatepickerDateCustomClasses[] | null = null;
    @Input() hidePlaceholder = false;
    @Input() horizontalLabel: boolean = false;
    @ViewChild('datePickerDirective') private datePickerDirective: BsDatepickerDirective;
    @ViewChild('datePickerElement') private datePickerElement: ElementRef;
    @ViewChild('datePickerInputElement') private datePickerInputElement: ElementRef;
    @ViewChild(BsDatepickerInputDirective) private bsDatepickerInputDirective: BsDatepickerInputDirective;
    private inputFormat: string;
    private bsDatepickerFormat: string;

    // different formats needed: one for Angular pipe, one for NgBootstrap
    @Input('format') set format(format: string) {
        if (format) {
            this.inputFormat = normalizeNgBootstrapDateFormat(format);
            this.bsDatepickerFormat = convertNgAngularPipeDateFormatToNgBootstrapFormat(format);
        }
    }

    selectedDate: Date;
    timePart: string;
    private subValue: Subscription;
    private subStatus: Subscription;
    valid = false;
    touched = false;
    placement: Placement;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private bsDatepickerConfig: BsDatepickerConfig,
                private bsLocaleService: BsLocaleService,
                private datePipe: DatePipe,
                @Self() @Optional() public control: NgControl) {
        super(control);
        this.inputFormat = normalizeNgBootstrapDateFormat(this.bsDatepickerConfig.dateInputFormat);
        this.bsDatepickerFormat = convertNgAngularPipeDateFormatToNgBootstrapFormat(this.inputFormat);
    }

    private getTzOffset(date: string): string {
        // Compute offset from UTC to local zone. We need it to invoke the new Date/toIsoDate methods correctly
        const minutesTz = new Date(date).getTimezoneOffset();
        const hh = Math.floor(Math.abs(minutesTz / 60));
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
        if (this.disabled) {
            return;
        }
        this.placement = calculateDatePickerPosition(this.datePickerElement);
        // Wait for the nex javascript execution cycle, in this way the component read the updated input value.
        setTimeout(() => {
            this.datePickerDirective.toggle();
            this.onTouched();
        }, 0);
    }

    ngOnInit(): void {
        super.ngOnInit();
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

    ngAfterViewInit(): void {
        this.hackBsDatepicker(this.bsDatepickerInputDirective);
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
                // here is the hack: the original version did not have strict: true
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

    private writeInput(value: Date): void {
        if (value && this.checkDate(value)) {
            this.datePickerInputElement.nativeElement.value = this.datePipe.transform(value, this.inputFormat);
        } else {
            this.datePickerInputElement.nativeElement.value = null;
        }
    }
}
