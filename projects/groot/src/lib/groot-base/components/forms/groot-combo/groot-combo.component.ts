import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ComboDataRequest, ComboDataRequestWithSelected, PaginatedResponse} from '../../../utils/pagination.model';
import {TranslateService} from '@ngx-translate/core';
import {DropdownPosition, NgSelectComponent} from '@ng-select/ng-select';

export declare type AddTagFn = ((term: string) => any | Promise<any>);
export declare type GroupValueFn = (key: string | object, children: any[]) => string | object;

@Component({
  selector: 'groot-combo',
  templateUrl: './groot-combo.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootComboComponent),
      multi: true
    }
  ],
  styles: [`:host {
    display: block;
  }`],
})
export class GrootComboComponent implements ControlValueAccessor, OnInit {
  @Output() requestData = new EventEmitter<ComboDataRequestWithSelected | ComboDataRequest>();
  @Output() cleared = new EventEmitter<void>();

  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() notFoundText = 'combo.noItems';
  @Input() addTagText = 'combo.addItem';
  @Input() addTag: boolean | AddTagFn | null = null;
  @Input() clearAllText = 'combo.clearAll';
  @Input() loadingText = 'combo.loading';
  @Input() typeToSearchText = 'combo.typeToSearch';
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() helpText: string | null = null;
  @Input() multiple = false;
  @Input() bindLabel: string | null = null;
  @Input() bindValue: string | null = null;
  @Input() itemTemplate: TemplateRef<any> | null = null;
  @Input() labelTemplate: TemplateRef<any> | null = null;
  @Input() multiLabelTemplate: TemplateRef<any> | null = null;
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() maxItemsAtATime = 100;
  @Input() clearable = true;
  @Input() toggleShowOnlySelected = false;
  @Input() toggleShowOnlySelectedText = 'combo.showOnlySelected';
  @Input() translateItemText = false;
  @Input() hidePlaceholder = false;
  @Input() searchFn: (term: string, item: string | any) => boolean | null = null;
  @Input() formControl: FormControl | null = null;
  @Input() dropDownPosition: DropdownPosition = 'auto';
  @Input() errorMessage = 'common.required';
  @Input() maxMultipleItemsDisplayed: number | undefined = undefined;
  @Input() showSelectButtons = false;
  @Input() groupBy: string | null = null;
  @Input() groupValue: GroupValueFn | null = null;

  @ViewChild(NgSelectComponent) ngCombo: NgSelectComponent;

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

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private translateService: TranslateService) {
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

  get actualMaxMultipleItemsDisplayed(): number {
    if (this.maxMultipleItemsDisplayed) {
      return this.maxMultipleItemsDisplayed;
    } else if (this._checkboxes) {
      return 1;
    } else {
      const numSelected = Array.isArray(this.selectedValue) ? this.selectedValue.length : 1;
      return Math.max(this.allItems.length, numSelected);
    }
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
    this.onChange(this.selectedValue);
  }

  unselectAll() {
    this.writeValue([]);
    this.onChange(this.selectedValue);
  }

  // Incremental loading

  ngOnInit(): void {
    if (this.typeahead) {
      this.typeahead.pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe(searchTerm => this.onFilterTextChanged(searchTerm));
    }
    if (!this.searchFn && this.translateItemText) {
      this.createDefaultTranslateSearchFn();
    }
  }

  private createDefaultTranslateSearchFn() {
    this.searchFn = ((term, item) => {
      let word: string;
      if (typeof item === 'string') {
        word = item;
      } else {
        word = item[this.bindLabel] || '';
      }
      word = this.translateService.instant(word);
      return word.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
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
    let request: ComboDataRequestWithSelected | ComboDataRequest;
    if (this.toggleShowOnlySelected) {
      request = {
        filterText: this._lastTypeaheadValue,
        pageNum: pageToLoad,
        pageLen: this._fetchDataIncrementally ? this.maxItemsAtATime : 999999,
        showOnlySelected: this.showOnlySelected,
        selected: this.showOnlySelected ? this.selectedValue : null
      };
    } else {
      request = {
        filterText: this._lastTypeaheadValue,
        pageNum: pageToLoad,
        pageLen: this._fetchDataIncrementally ? this.maxItemsAtATime : 999999,
      };
    }
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

  onCleared(): void {
    this.onTouched();
    this.cleared.next();
  }
}
