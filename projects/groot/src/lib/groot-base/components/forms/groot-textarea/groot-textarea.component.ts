import {ChangeDetectorRef, Component, Input, Optional, Self} from '@angular/core';
import {NgModel, NgControl} from '@angular/forms';
import {GrootBaseInput} from '../groot-base-input';

@Component({
  selector: 'groot-textarea',
  templateUrl: './groot-textarea.component.html',
  styles: [`:host {
    display: block;
  }`],
})
export class GrootTextAreaComponent extends GrootBaseInput {
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() rows = 5;
  @Input() hidePlaceholder = false;
  @Input() maxLength: number | undefined = undefined;
  text: string;
  input: NgModel;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Self() @Optional() public control: NgControl) {
    super(control);
  }

  onChange = (text: string) => null;
  onTouched = () => null;

  writeValue(text: string): void {
    this.text = text;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(text: string): void {
    this.writeValue(text);
    this.onChange(this.text);
  }

  registerOnChange(fn: (text: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
