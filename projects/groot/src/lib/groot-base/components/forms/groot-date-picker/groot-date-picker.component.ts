import {ChangeDetectorRef, Component, ElementRef, forwardRef, HostListener, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {BsDatepickerDirective} from 'ngx-bootstrap';

@Component({
  selector: 'groot-date-picker',
  templateUrl: './groot-date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootDatePickerComponent),
      multi: true
    }
  ]
})
export class GrootDatePickerComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder: string | null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() formControl: FormControl = null;
  @Input() format = 'dd/MM/yyyy';
  @Input() minDate: Date | null;
  @Input() maxDate: Date | null;
  @Input() hidePlaceholder = false;
  placement = 'bottom';
  selectedDate: Date;
  @ViewChild('datePickerDirective') private datePickerDirective: BsDatepickerDirective;
  input: NgModel;

  constructor(private _element: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.onToggle();
  }

  private onToggle() {
    this.placement = this.calculatePosition();
    // Wait for the nex javascript execution cycle, in this way the component read the updated input value.
    setTimeout(() => {
      this.datePickerDirective.toggle();
      this.onTouched();
    }, 0);
  }

  private calculatePosition(): string {
    let position = 'bottom';

    if (
      !this._element ||
      !this._element.nativeElement ||
      !this._element.nativeElement.childNodes ||
      !this._element.nativeElement.childNodes[1]
    ) {
      return position;
    }

    const rect: ClientRect | DOMRect = this._element.nativeElement.childNodes[1].getBoundingClientRect();

    const height = 315;
    const width = 308;

    const topDistance = rect.height + rect.top;
    const bottomDistance = (window.innerHeight - rect.top) - rect.height;
    const leftDistance = rect.width + rect.left;
    const rightDistance = (window.innerWidth - rect.left) - rect.width;

    if (topDistance > height && height > bottomDistance) {
      position = 'top';
    }

    if (rightDistance > width && width > leftDistance) {
      position = position + ' right';
    }

    return position;
  }

  onChange = (selectedDate: Date) => null;
  onTouched = () => null;

  writeValue(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(selectedDate: Date) {
    this.writeValue(selectedDate);
    this.onChange(this.selectedDate);
  }

  registerOnChange(fn: (selectedDate: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
