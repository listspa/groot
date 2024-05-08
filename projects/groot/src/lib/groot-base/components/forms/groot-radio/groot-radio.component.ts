import {ChangeDetectorRef, Component, Input, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {GrootBaseInput} from '../groot-base-input';

@Component({
  selector: 'groot-radio',
  templateUrl: './groot-radio.component.html',
  styles: [`:host {
    display: block;
  }`],
})
export class GrootRadioComponent extends GrootBaseInput {
  @Input() public name: string;
  @Input() public idRadio: string;
  @Input() public label: string;
  @Input() public value: any | null = null;
  @Input() public disabled = false;
  selectedValue: string;

  onChange = (text: string) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Self() @Optional() public control: NgControl) {
    super(control);
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
