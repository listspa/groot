import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-toggle-button',
  templateUrl: './groot-toggle-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootToggleButtonComponent),
      multi: true
    }
  ]
})
export class GrootToggleButtonComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() disabled = false;
  @Input() horizontalLabel = false;
  value: boolean;

  onChange = (checked: boolean) => null;
  onTouched = () => null;

  writeValue(checked: boolean): void {
    this.value = checked;
    this.onChange(checked);
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

  toggleStatus() {
    if (this.disabled) {
      return;
    }
    this.writeValue(!this.value);
  }
}
