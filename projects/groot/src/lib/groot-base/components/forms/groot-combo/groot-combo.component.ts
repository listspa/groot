import {Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ComboDataRequest} from '../../../nbpu.interfaces';

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
export class GrootComboComponent implements ControlValueAccessor, OnInit {
  @Output() requestData = new EventEmitter<ComboDataRequest>();

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
  @Input() multiple = false;
  @Input() bindLabel: string | null = null;
  @Input() bindValue: string | null = null;
  @Input() itemTemplate: TemplateRef<any> | null;
  @Input() labelTemplate: TemplateRef<any> | null;
  @Input() multiLabelTemplate: TemplateRef<any> | null;
  @Input() fetchDataIncrementally = false;
  @Input() maxItemsAtATime = 100;

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

  @Input() set filterServerSide(value: boolean) {
    if (value) {
      this.typeahead = new Subject();
    }
  }

  /**
   * Use only when giving all the items at one time.
   */
  @Input() set items(value: string[] | any[]) {
    this.allItems = value;
  }

  /**
   * Use only when giving items incrementally, i.e. when `fetchDataIncrementally` is true.
   */
  @Input() set itemsPage(value: string[] | any[]) {
    if (!value) {
      return;
    }
    this.allItems = this.allItems.concat(value);
  }

  open = null;
  allItems: string[] | any[] = [];
  selectedValue: any | any[];
  typeahead: Subject<string>;
  private _showAsListBox = false;
  private _checkboxes = false;
  private _lastDataRequestPageNum = 0;
  private _lastTypeaheadValue: string;

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

  // Checkboxes

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

  // Incremental loading

  ngOnInit(): void {
    if (this.typeahead) {
      this.typeahead.pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe(searchTerm => {
        // Reset current values
        this.allItems = [];
        this._lastDataRequestPageNum = 0;

        // Search
        this._lastTypeaheadValue = searchTerm;
        this.doRequestData();
      });
    }
  }

  onScroll({end}) {
    if (end < this.allItems.length) {
      return;
    }
    ++this._lastDataRequestPageNum;
    this.doRequestData();
  }

  private doRequestData() {
    const request: ComboDataRequest = {
      filterText: this._lastTypeaheadValue,
      pageNum: this._lastDataRequestPageNum,
      pageLen: this.maxItemsAtATime
    };
    this.requestData.emit(request);
  }
}
