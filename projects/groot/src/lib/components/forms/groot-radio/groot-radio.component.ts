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
  public _value: string;
  public _checked = false;
  @Input() public disabled = false;
  selectedValue: string;

  onChange = (text: string) => null;
  onTouched = () => null;

  constructor() {
  }

  @Input()
  public set checked(checked: boolean) {
    checked = checked && !this.disabled;
    this._checked = checked;
    if (checked && this._value) {
      this.writeValue(this._value);
    }
  }

  @Input()
  public set value(value: string) {
    this._value = value;
    if (this._checked && !this.disabled) {
      this.writeValue(this._value);
    }
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
