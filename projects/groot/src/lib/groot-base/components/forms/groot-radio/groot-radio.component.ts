import {ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-radio',
  templateUrl: './groot-radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootRadioComponent),
      multi: true
    }
  ],
  styles: [`:host {
    display: block;
  }`],
})
export class GrootRadioComponent implements ControlValueAccessor {
  @Input() public name: string;
  @Input() public idRadio: string;
  @Input() public label: string;
  @Input() public value: any | null = null;
  @Input() public disabled = false;
  @Input() formControl: UntypedFormControl = null;
  selectedValue: string;

  onChange = (text: string) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
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
    this.selectedValue = value;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(value: string): void {
    this.writeValue(value);
    this.onChange(value);
  }
}
