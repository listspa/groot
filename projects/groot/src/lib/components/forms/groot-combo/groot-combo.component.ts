import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-combo',
  templateUrl: './groot-combo.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootComboComponent),
      multi: true
    }
  ]
})
export class GrootComboComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() items: string[] | object[];
  @Input() multiple = false;
  @Input() bindLabel: string | null = null;
  @Input() bindValue: string | null = null;
  selectedValue: any;

  onChange = (selectedValue: any) => null;
  onTouched = () => null;

  writeValue(selectedValue: any): void {
    this.selectedValue = selectedValue;
    this.onChange(this.selectedValue);
  }

  registerOnChange(fn: (selectedValue: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
