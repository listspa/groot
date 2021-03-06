import {ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';

@Component({
  selector: 'groot-textarea',
  templateUrl: './groot-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootTextAreaComponent),
      multi: true
    }
  ],
  styles: [`:host {
    display: block;
  }`],
})
export class GrootTextAreaComponent implements ControlValueAccessor {
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() rows = 5;
  @Input() formControl: FormControl = null;
  @Input() hidePlaceholder = false;
  @Input() maxLength: number | undefined = undefined;
  text: string;
  input: NgModel;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  onChange = (text: string) => null;
  onTouched = () => null;

  writeValue(text: string): void {
    this.text = text;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(text: string) {
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
