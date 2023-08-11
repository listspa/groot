import {ChangeDetectorRef, Component, Input, Optional, Self, TemplateRef} from '@angular/core';
import {NgControl} from '@angular/forms';
import {GrootBaseInput} from '../groot-base-input';

@Component({
  selector: 'groot-toggle-button',
  templateUrl: './groot-toggle-button.component.html',
  styles: [`:host {
    display: block;
  }`],
})
export class GrootToggleButtonComponent extends GrootBaseInput {
  @Input() label: string | null = null;
  @Input() disabled = false;
  @Input() horizontalLabel = true;
  @Input() infoPopoverTemplate: TemplateRef<any> | null = null;
  value: boolean;

  onChange = (checked: boolean) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Self() @Optional() public control: NgControl) {
    super(control);
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

  toggleStatus(): void {
    if (this.disabled) {
      return;
    }
    this.writeValue(!this.value);
    this.onChange(this.value);
    this.onTouched();
  }
}
