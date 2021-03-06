import {ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewChild} from '@angular/core';
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
  ],
  styles: [`:host {
    display: block;
  }`],
})
export class GrootInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'password' | 'color' | 'email' | 'number' | 'search' = 'text';
  @Input() step = 1;
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string | null = null;
  @Input() iconLeft: string | string[] | null = null;
  @Input() templateLeft: TemplateRef<any> | null = null;
  @Input() iconRight: string | string[] | null = null;
  @Input() templateRight: TemplateRef<any> | null = null;
  @Input() formControl: FormControl | null = null;
  @Input() errorMessage = 'common.required';
  @Input() hidePlaceholder = false;
  @Input() maxLength: number | undefined = undefined;
  @Output() enter: EventEmitter<string> = new EventEmitter();
  @ViewChild('htmlInput') private htmlInput: ElementRef;
  text: string;
  private textSent: string;

  input: NgModel;
  onChange = (text: string) => null;
  onTouched = () => null;

  @ContentChild(GrootInputIconLeftDirective, {read: TemplateRef})
  set templateLeftTpl(value: TemplateRef<any>) {
    this.templateLeft = value;
  }

  @ContentChild(GrootInputIconRightDirective, {read: TemplateRef})
  set templateRightTpl(value: TemplateRef<any>) {
    this.templateRight = value;
  }

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

  public select(): void{
    this.htmlInput.nativeElement.select();
  }

  public focus(): void{
    this.htmlInput.nativeElement.focus();
  }
}
