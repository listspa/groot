import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-radio',
  templateUrl: './groot-radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootRadioComponent),
      multi: true
    }
  ]
})
export class GrootRadioComponent implements ControlValueAccessor {
  @Input() public name: string;
  @Input() public idRadio: string;
  @Input() public label: string;
  @Input() public value: string;
  @Input() public disabled = false;
  selectedValue: string;

  onChange = (text: string) => null;
  onTouched = () => null;

  constructor() {
  }

  registerOnChange(fn: (text: string) => null): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => null): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    if (!value) {
      return;
    }
    this.selectedValue = value;
    this.onChange(value);
  }

}
