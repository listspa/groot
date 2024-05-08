import {ChangeDetectorRef, Component, Input, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {GrootBaseInput} from '../groot-base-input';

@Component({
  selector: 'groot-checkbox',
  templateUrl: './groot-checkbox.component.html',
  styles: [`:host {
    display: block;
  }`],
})
export class GrootCheckboxComponent extends GrootBaseInput {
  @Input() public name: string;
  @Input() public label: string | null = null;
  @Input() public disabled = false;
  @Input() public checked = false;

  onChange = (checked: boolean) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Self() @Optional() public control: NgControl) {
    super(control);
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
