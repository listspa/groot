import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-input',
  templateUrl: './groot-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootInputComponent),
      multi: true
    }
  ]
})
export class GrootInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'password' | 'color' | 'email' | 'number' | 'search' = 'text';
  @Input() label: string;
  @Input() placeholder: string | null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() iconLeft: string | string[] | null = null;
  @Input() iconRight: string | string[] | null = null;
  @Output() enter: EventEmitter<string> = new EventEmitter();
  text: string;
  private textSent: string;

  onChange = (text: string) => null;
  onTouched = () => null;

  writeValue(text: string): void {
    this.text = text;
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

  public onEnterPressed() {
    if (this.text !== this.textSent) {
      this.textSent = this.text;
      this.enter.emit(this.text);
    }
  }
}
