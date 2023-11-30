import {ChangeDetectorRef, Component, ElementRef, forwardRef, HostListener, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';

@Component({
  selector: 'groot-time-picker',
  templateUrl: './groot-time-picker.component.html',
  styleUrls: ['./groot-time-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootTimePickerComponent),
      multi: true
    }
  ]

})
export class GrootTimePickerComponent implements ControlValueAccessor {

  @Input() formControl: FormControl = null;
  @Input() label: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() minTime: string | null;
  @Input() maxTime: string | null;
  @Input() step: number | null;
  selectedTime: string | null = null;
  @ViewChild('input') input: NgModel;
  @ViewChild('inputElement') inputElement: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  onChange = (selectedTime: string) => null;
  onTouched = () => null;

  writeValue(selectedTime: string): void {
    this.selectedTime = selectedTime;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(selectedTime: string) {
    this.writeValue(selectedTime);
    this.onChange(this.selectedTime);
  }

  registerOnChange(fn: (selectedTime) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onClick(): void {
    if (this.inputElement?.nativeElement?.showPicker) {
      this.inputElement.nativeElement.showPicker();
    }
  }
}
