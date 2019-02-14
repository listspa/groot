import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  selectedDate: Date;

  onChange = (selectedDate: Date) => null;
  onTouched = () => null;

  writeValue(selectedDate: Date): void {
    this.selectedDate = selectedDate;
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
