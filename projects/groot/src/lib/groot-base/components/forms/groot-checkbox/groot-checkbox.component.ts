import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-checkbox',
  templateUrl: './groot-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootCheckboxComponent),
      multi: true
    }
  ]
})
export class GrootCheckboxComponent implements ControlValueAccessor {
  @Input() public name: string;
  @Input() public label: string;
  @Input() public disabled = false;
  @Input() public checked = false;

  onChange = (checked: boolean) => null;
  onTouched = () => null;

  constructor() {
  }

  registerOnChange(fn: (checked: boolean) => null): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => null): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(checked: boolean): void {
    this.checked = checked;
    this.onChange(checked);
  }

}
