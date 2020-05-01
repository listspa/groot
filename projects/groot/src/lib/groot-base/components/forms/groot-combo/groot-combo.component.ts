import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ComboDataRequestWithSelected, PaginatedResponse} from '../../../utils/pagination.model';

export declare type AddTagFn = ((term: string) => any | Promise<any>);

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
  @Output() requestData = new EventEmitter<ComboDataRequestWithSelected>();

  @Input() label: string;
  @Input() placeholder: string | null;
  @Input() notFoundText = 'combo.noItems';
  @Input() addTagText = 'combo.addItem';
  @Input() addTag: boolean | AddTagFn;
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
  @Input() headerTemplate: TemplateRef<any> | null;
  @Input() maxItemsAtATime = 100;
  @Input() clearable = true;
  @Input() toggleShowOnlySelected = false;
  @Input() toggleShowOnlySelectedText = 'combo.showOnlySelected';
  @Input() translateItemText = false;
  @Input() hidePlaceholder = false;

  x: boolean;
  showOnlySelected = false;

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

  /**
   * Use when you want to have the filter done in your callback, rather than automatically
   * by the combo. The combo will emit an event `requestData` and you will need to send it
   * the new items in `items` or `itemsPage`.
   */
  @Input() set filterServerSide(value: boolean) {
    if (value) {
      this.typeahead = new Subject();
    }
  }

  /**
   * Use when the combo has lots of values and you need to fetch them a few at a time from
   * the server. Implies `filterServerSide`.
   */
  @Input() set fetchDataIncrementally(value: boolean) {
    this._fetchDataIncrementally = value;
    this.filterServerSide = true;
  }

  /**
   * Use only when giving all the items at one time.
   */
  @Input() set items(value: string[] | any[]) {
    this.allItems = value;
    this._allItemsBackup = value;
    this.loading = false;
  }

  /**
   * Use only when giving items incrementally, i.e. when `fetchDataIncrementally` is true.
   */
  @Input() set itemsPage(page: PaginatedResponse<string | any>) {
    if (!page) {
      return;
    }
    this._pages[page.pageNum] = page.records;
    this._totalNumItems = page.totalNumRecords;

    this.allItems = [].concat(...this._pages);
    this.loading = false;
  }

  open = null;
  allItems: string[] | any[] = [];
  selectedValue: any | any[];
  typeahead: Subject<string>;
  loading = false;
  private _showAsListBox = false;
  private _checkboxes = false;
  private _lastTypeaheadValue: string;
  private _fetchDataIncrementally = false;
  private _pages: string[][] = [];
  private _totalNumItems: number | null = null;
  private _allItemsBackup: string[] | any[] = [];

  onChange = (selectedValue: any | any[]) => null;
  onTouched = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  writeValue(selectedValue: any | any[]): void {
    this.selectedValue = selectedValue;
    if (this.showOnlySelected) {
      this.filterSelected();
    }
    this.changeDetectorRef.detectChanges();
  }

  writeValueFromGui(selectedValue: any | any[]) {
    this.writeValue(selectedValue);
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

  get fetchDataIncrementally(): boolean {
    return this._fetchDataIncrementally;
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
      this.writeValue((this.allItems as any[]).map(item => item[this.bindValue]));
    } else {
      this.writeValue([...this.allItems]);
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
      ).subscribe(searchTerm => this.onFilterTextChanged(searchTerm));
    }
  }

  private onFilterTextChanged(searchTerm: string | null): void {
    // Reset current values
    this.resetItems();

    // Search
    this._lastTypeaheadValue = searchTerm;
    this.doRequestData(0);
  }

  private resetItems() {
    this.allItems = [];
    this._pages = [];
    this._totalNumItems = null;
  }

  onScroll({end}) {
    if (end > 0 && end < this.allItems.length) {
      return;
    }
    if (this._totalNumItems !== undefined && this._totalNumItems !== null && end >= this._totalNumItems) {
      return;
    }
    const pageToLoad = Math.trunc(end / this.maxItemsAtATime);
    if (this._pages[pageToLoad]) {
      return;
    }

    this.doRequestData(pageToLoad);
  }

  private doRequestData(pageToLoad: number) {
    const request: ComboDataRequestWithSelected = {
      filterText: this._lastTypeaheadValue,
      pageNum: pageToLoad,
      pageLen: this._fetchDataIncrementally ? this.maxItemsAtATime : 999999,
      showOnlySelected: this.showOnlySelected,
      selected: this.showOnlySelected ? this.selectedValue : null
    };
    this.loading = true;
    this.requestData.emit(request);
    this._pages[pageToLoad] = [];
  }

  onOpen() {
    if (this.typeahead) {
      this.onFilterTextChanged(null);
    }
  }

  hasLoadedEverything(): boolean {
    if (this._fetchDataIncrementally) {
      if (this._totalNumItems !== undefined && this._totalNumItems !== null) {
        return this.allItems.length >= this._totalNumItems;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  filterSelected() {
    if (this.typeahead) {
      this.resetItems();
      this.doRequestData(0);
    } else {
      if (this.showOnlySelected) {
        this.allItems = this._allItemsBackup.filter(value => {
          if (this.bindValue) {
            return this.selectedValue && this.selectedValue.indexOf(value[this.bindValue]) > -1;
          } else {
            return this.selectedValue && this.selectedValue.indexOf(value) > -1;
          }
        });
      } else {
        this.allItems = [...this._allItemsBackup];
      }
    }
  }
}
