import {ChangeDetectorRef, Component, ElementRef, HostListener, Input, Optional, Self, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {GrootBaseInput} from '../groot-base-input';

@Component({
  selector: 'groot-time-picker',
  templateUrl: './groot-time-picker.component.html',
  styleUrls: ['./groot-time-picker.component.css'],
})
export class GrootTimePickerComponent extends GrootBaseInput {

  @Input() label: string | null = null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() minTime: string | null;
  @Input() maxTime: string | null;
  @Input() step: number | null;
  @Input() horizontalLabel: boolean = false;
  selectedTime: string | null = null;
  @ViewChild('inputElement') inputElement: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Self() @Optional() public control: NgControl) {
    super(control);
  }
  onChange = (selectedTime: string) => null;
  onTouched = () => null;

  writeValue(selectedTime: string): void {
    this.selectedTime = selectedTime;
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(selectedTime: string): void {
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
  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.inputElement?.nativeElement?.showPicker) {
      this.inputElement.nativeElement.showPicker();
    }
  }
}
