import {AfterViewInit, Component, ElementRef, forwardRef, HostListener, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
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
export class GrootDatePickerComponent implements ControlValueAccessor, AfterViewInit {
  @Input() label: string;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  placement = 'bottom';
  selectedDate: Date;
  @ViewChild("datePickerDirective")
  private datePickerDirective: BsDatepickerDirective;

  constructor(private _element: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.placement = this.calculatePosition();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopImmediatePropagation();
    this.onToggle();
  }

  private onToggle() {
    this.placement = this.calculatePosition();
    // Wait for the nex javascript execution cycle, in this way the component read the updated input value.
    setTimeout(() => {
      this.datePickerDirective.toggle();
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

    let rect: ClientRect | DOMRect = this._element.nativeElement.childNodes[1].getBoundingClientRect();

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
