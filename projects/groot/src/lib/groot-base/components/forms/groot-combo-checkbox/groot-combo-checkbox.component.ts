import {Component, forwardRef, Input, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-combo-checkbox',
  templateUrl: './groot-combo-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootComboCheckboxComponent),
      multi: true
    }
  ]
})
export class GrootComboCheckboxComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder: string | null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() items: string[] | object[];
  @Input() bindLabel: string | null = null;
  @Input() bindValue: string | null = null;
  @Input() itemTemplate: TemplateRef<any> | null;
  selectedValue: any[];
  open = null;
  private _showAsListBox = false;

  onChange = (selectedValue: any[]) => null;
  onTouched = () => null;

  writeValue(selectedValue: any[]): void {
    this.selectedValue = selectedValue;
    this.onChange(this.selectedValue);
  }

  registerOnChange(fn: (selectedValue: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isAllSelected() {
    return this.items &&
      this.selectedValue &&
      this.items.length === this.selectedValue.length;
  }

  isNoneSelected() {
    return !this.selectedValue ||
      this.selectedValue.length === 0;
  }

  selectAll() {
    if (this.bindValue) {
      this.writeValue((this.items as any[]).map(item => item[this.bindValue]));
    } else {
      this.writeValue([...this.items]);
    }
  }

  unselectAll() {
    this.writeValue([]);
  }

  @Input() set showAsListBox(v: boolean) {
    this._showAsListBox = v;
    if (v) {
      this.open = true;
    }
  }

  get showAsListBox(): boolean {
    return this._showAsListBox;
  }
}
