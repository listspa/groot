import {ChangeDetectorRef, Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {GrootInputIconLeftDirective, GrootInputIconRightDirective} from './groot-input.directive';

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
  @ContentChild(GrootInputIconLeftDirective, {read: TemplateRef}) templateLeft: TemplateRef<any> = null;
  @Input() iconRight: string | string[] | null = null;
  @ContentChild(GrootInputIconRightDirective, {read: TemplateRef}) templateRight: TemplateRef<any> = null;
  @Input() formControl: FormControl = null;
  @Input() errorMessage = 'common.required';
  @Input() hidePlaceholder = false;
  @Output() enter: EventEmitter<string> = new EventEmitter();
  text: string;
  private textSent: string;

  input: NgModel;
  onChange = (text: string) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

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

  public onEnterPressed() {
    if (this.text !== this.textSent) {
      this.textSent = this.text;
      this.enter.emit(this.text);
    }
  }
}
