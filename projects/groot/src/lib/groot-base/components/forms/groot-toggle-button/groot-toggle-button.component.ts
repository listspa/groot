import {ChangeDetectorRef, Component, forwardRef, Input, TemplateRef} from '@angular/core';
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
  ],
  styles: [`:host {
    display: block;
  }`],
})
export class GrootToggleButtonComponent implements ControlValueAccessor {
  @Input() label: string | null = null;
  @Input() disabled = false;
  @Input() horizontalLabel = true;
  @Input() infoPopoverTemplate: TemplateRef<any> | null = null;
  value: boolean;

  onChange = (checked: boolean) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  writeValue(checked: boolean): void {
    this.value = checked;
    this.changeDetectorRef.detectChanges();
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
    this.onChange(this.value);
    this.onTouched();
  }
}
