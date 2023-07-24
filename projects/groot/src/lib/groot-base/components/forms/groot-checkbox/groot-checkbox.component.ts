import {ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-checkbox',
  templateUrl: './groot-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootCheckboxComponent),
      multi: true
    }
  ],
  styles: [`:host {
    display: block;
  }`],
})
export class GrootCheckboxComponent implements ControlValueAccessor {
  @Input() public name: string;
  @Input() public label: string | null = null;
  @Input() public disabled = false;
  @Input() public checked = false;
  @Input() formControl: UntypedFormControl | null = null;

  onChange = (checked: boolean) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
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
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(checked: boolean): void {
    this.writeValue(checked);
    this.onChange(checked);
  }
}
