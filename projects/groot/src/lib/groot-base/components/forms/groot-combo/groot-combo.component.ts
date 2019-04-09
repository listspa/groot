import {Component, forwardRef, Input, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-combo',
  templateUrl: './groot-combo.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootComboComponent),
      multi: true
    }
  ]
})
export class GrootComboComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder: string | null;
  @Input() notFoundText = 'combo.noItems';
  @Input() addTagText = 'combo.addItem';
  @Input() clearAllText = 'combo.clearAll';
  @Input() loadingText = 'combo.loading';
  @Input() typeToSearchText = 'combo.typeToSearch';
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string = null;
  @Input() items: string[] | object[];
  @Input() multiple = false;
  @Input() bindLabel: string | null = null;
  @Input() bindValue: string | null = null;
  @Input() itemTemplate: TemplateRef<any> | null;
  @Input() labelTemplate: TemplateRef<any> | null;
  @Input() multiLabelTemplate: TemplateRef<any> | null;

  @Input() set checkboxes(value: boolean) {
    this._checkboxes = value;
    this.multiple = true;
  }

  @Input() set showAsListBox(v: boolean) {
    this._showAsListBox = v;
    if (v) {
      this.open = true;
    }
  }

  open = null;
  selectedValue: any | any[];
  private _showAsListBox = false;
  private _checkboxes = false;

  onChange = (selectedValue: any | any[]) => null;
  onTouched = () => null;

  writeValue(selectedValue: any | any[]): void {
    this.selectedValue = selectedValue;
    this.onChange(this.selectedValue);
  }

  registerOnChange(fn: (selectedValue: any | any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get showAsListBox(): boolean {
    return this._showAsListBox;
  }

  get checkboxes(): boolean {
    return this._checkboxes;
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
}
