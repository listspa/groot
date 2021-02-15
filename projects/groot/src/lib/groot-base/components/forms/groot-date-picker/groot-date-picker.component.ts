import {ChangeDetectorRef, Component, ElementRef, forwardRef, HostListener, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {BsDatepickerDirective} from 'ngx-bootstrap/datepicker';
import {calculateDatePickerPosition, Placement} from './groot-date-picker-placement.utils';

@Component({
  selector: 'groot-date-picker',
  templateUrl: './groot-date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootDatePickerComponent),
      multi: true
    }
  ]
})
export class GrootDatePickerComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder: string | null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() formControl: FormControl = null;
  @Input() format = 'dd/MM/yyyy';
  @Input() minDate: Date | null;
  @Input() maxDate: Date | null;
  @Input() daysDisabled: number[] | null;
  @Input() datesDisabled: Date[] | null;
  @Input() datesEnabled: Date[] | null;
  @Input() hidePlaceholder = false;
  placement: Placement = 'bottom';
  selectedDate: Date;
  @ViewChild('datePickerDirective') private datePickerDirective: BsDatepickerDirective;
  @ViewChild('input') input: NgModel;

  constructor(private _element: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {
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
