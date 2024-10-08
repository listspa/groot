import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, Optional,
  Output,
  Self,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NgModel, NgControl} from '@angular/forms';
import {GrootBaseInput} from '../groot-base-input';

@Component({
  selector: 'groot-quick-search',
  templateUrl: './groot-quick-search.component.html',
  styles: [`:host {
    display: block;
  }`],
})
export class GrootQuickSearchComponent extends GrootBaseInput implements ControlValueAccessor, AfterViewInit {
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorMessage = 'common.required';
  @Input() hidePlaceholder = false;
  @Input() autofocus = false;
  @Input() horizontalLabel: boolean = false;
  @Output() enter: EventEmitter<string> = new EventEmitter();
  @Output() reset: EventEmitter<void> = new EventEmitter();
  @ViewChild('htmlInput') private htmlInput: ElementRef;
  text: string;
  private textSent: string;

  input: NgModel;
  onChange = (text: string) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Self() @Optional() public control: NgControl) {
    super(control);
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      this.focus();
    }
  }

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

  public onEnterPressed(): void {
    if (this.text !== this.textSent) {
      this.textSent = this.text;
      this.enter.emit(this.text);
    }
  }

  public select(): void {
    this.htmlInput.nativeElement.select();
  }

  public focus(): void {
    this.htmlInput.nativeElement.focus();
  }

  resetQuickSearch(): void {
    this.textSent = null;
    this.writeValueFromGui(null);
    this.reset.next();
  }
}
