import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ReplaySubject, Subject, Subscription} from 'rxjs';
import {ColumnsSelectorComponent} from './columns-selector/columns-selector.component';
import {SelectedColumns, TableColumn, TableColumns} from '../../model/table-columns.model';
import {dropDownOnCreateAnimation} from '../../../groot-base/utils/animations-utils';
import {
  ComboDataRequest,
  FilterOption,
  FilterPaginationOptions,
  NbpuSchemaFieldType,
  PaginatedResponse,
  PaginationOptions
} from '../../../groot-base/utils/pagination.model';
import {ElementResizingHandler} from '../../../groot-base/utils/element-resizing-handler';
import {GrootTableComponent, LoadingFailed} from '../../../groot-base/components/tables/groot-table/groot-table.component';
import {PopoverFilterService} from './popover-filter.service';
import {
  GrootTableAutocolActionsDirective,
  GrootTableAutocolTemplateForColumnDirective,
  GrootTableTitleAutocolRightAreaDirective
} from './groot-table-autocol.directive';
import {PopoverDataRequest} from '../../model/popover-filter.model';

export interface ColumnAndWidth {
  column: TableColumn;
  newPixelsWidth: number;
  thElement: HTMLElement;
}

@Component({
  selector: 'groot-table-autocol',
  templateUrl: './groot-table-autocol.component.html',
  animations: [dropDownOnCreateAnimation]
})
export class GrootTableAutocolComponent<T> implements AfterContentInit, OnDestroy {
  // Groot-table inputs
  @Input() downloadExcelLabel = 'common.downloadExcel';
  @Input() downloadExcelUrl: string | null;
  @Input() downloadExcelUrlProvider: () => string | null;
  @Input() downloadExcelArgs: () => any | null;
  @Input() downloadExcelIsAjax = false;
  @Input() downloadExcelFileName = 'download.xlsx';
  @Input() defaultSortColumn: string;
  @Input() defaultSortReverseFlag = false;
  @Input() pageSize = 15;
  @Input() tableClassName: string | string[] = '';
  @Input() tHeadClassName: string | string[] = 'thead-primary';
  @Input() trClassName: string | string[] = 'text-nowrap';
  @Input() showRefreshIcon = false;
  @Input() lastRefreshTimestamp: Date | string = null;
  @Input() hideTableIfEmpty = false;
  @Output() search = new EventEmitter<FilterPaginationOptions>();
  @Input() searchResultsData: PaginatedResponse<T> | LoadingFailed;
  @Input() actionsTemplate: TemplateRef<any>;
  @ContentChildren(GrootTableAutocolTemplateForColumnDirective) columnsTemplates: QueryList<GrootTableAutocolTemplateForColumnDirective>;
  @Input() autocolTableTitleRightArea: TemplateRef<any>;
  @Input() allowChoosingColumns = true;
  @Input() allowResizingColumns = true;
  @Input() allowReorderColumns = true;

  // Column selector
  @Input() availableColumns: TableColumns;
  @Input() selectedColumns: TableColumns;
  @Input() accordionColumns: TableColumns;
  @Output() columnsSelectionChanged = new EventEmitter<SelectedColumns>();
  @Output() columnResized = new EventEmitter<ColumnAndWidth>();
  @Output() searchPopoverNeedsData = new EventEmitter<PopoverDataRequest>();

  NbpuSchemaFieldType = NbpuSchemaFieldType;
  private resizingSubscription: Subscription;
  @ViewChild('resizingColIndicator') resizingColIndicator: ElementRef;

  // Filter popover
  @ViewChild('grootTable') grootTable: GrootTableComponent<T>;
  popoverFilters: { [key: string]: FilterOption } = {};

  @ContentChild(GrootTableAutocolActionsDirective, {read: TemplateRef})
  set actionsTemplateTpl(value: TemplateRef<any>) {
    this.actionsTemplate = value;
  }

  @ContentChild(GrootTableTitleAutocolRightAreaDirective, {read: TemplateRef})
  set autocolTableTitleRightAreaTpl(value: TemplateRef<any>) {
    this.autocolTableTitleRightArea = value;
  }

  constructor(private bsModalService: BsModalService,
              private popoverFilterService: PopoverFilterService) {
  }

  // Automatically set the templates from the directive

  ngAfterContentInit(): void {
    this.columnsTemplates.forEach(colTpl => {
      this.availableColumns
        .filter(c => c.key === colTpl.columnKey)
        .forEach(c => c.customTemplate = colTpl.template);
    });
  }

  // Columns drag & drop

  moveColumn(event: CdkDragDrop<TableColumn[]>) {
    const newSelectedColumns = [...this.selectedColumns];
    moveItemInArray(newSelectedColumns, event.previousIndex, event.currentIndex);

    // Signal
    this.columnsSelectionChanged.emit({
      selected: newSelectedColumns,
      accordion: this.accordionColumns
    });
  }

  // Columns selector

  selectColumns() {
    const onColumnsSelected = new Subject<SelectedColumns>();
    this.bsModalService.show(ColumnsSelectorComponent, {
      class: 'modal-xl modal-lg',
      initialState: {
        resultSubject: this.columnsSelectionChanged,
        available: this.availableColumns,
        selected: [...this.selectedColumns],
        accordion: [...this.accordionColumns]
      }
    });

    onColumnsSelected.subscribe(
      selection => {
        this.selectedColumns = selection.selected;
        this.accordionColumns = selection.accordion;

        // Forward for saving on the db, in local storage, etc
        this.columnsSelectionChanged.emit(selection);
      }
    );
  }

  // Columns resizing

  onStartResizingColumn(event: MouseEvent, column: TableColumn) {
    if (this.resizingSubscription) {
      this.resizingSubscription.unsubscribe();
    }

    const parentTh = (event as any).target.parentElement;
    const parentTable = parentTh.parentElement.parentElement.parentElement;

    this.showResizingIndicator(parentTh, parentTable);

    this.resizingSubscription = new ElementResizingHandler(event, parentTh)
      .startHandlingResizing()
      .subscribe(newSize => this.applyWidthToResizingIndicator(newSize),
        null,
        () => this.finalizeColumnResizing(parentTh, column)
      );
  }

  private applyWidthToResizingIndicator(newSize) {
    // Apply new width only to the resize indicator, to avoid too many layout re-flows
    this.resizingColIndicator.nativeElement.style.width = newSize.width + 'px';
  }

  private showResizingIndicator(parentTh, parentTable) {
    const thBoundingRect = parentTh.getBoundingClientRect();
    const tableBoundingRect = parentTable.getBoundingClientRect();
    this.resizingColIndicator.nativeElement.style.top = thBoundingRect.top + 'px';
    this.resizingColIndicator.nativeElement.style.left = thBoundingRect.left + 'px';
    this.resizingColIndicator.nativeElement.style.width = thBoundingRect.width + 'px';
    this.resizingColIndicator.nativeElement.style.height = tableBoundingRect.height + 'px';
    this.resizingColIndicator.nativeElement.style.display = 'block';
  }

  private finalizeColumnResizing(parentTh, column: TableColumn) {
    this.hideResizingIndicator();

    // Apply width to the columns
    const newWStyle: string = this.resizingColIndicator.nativeElement.style.width;
    const newW: number = parseInt(newWStyle, 10);

    this.columnResized.emit({column, newPixelsWidth: newW, thElement: parentTh});
  }

  private hideResizingIndicator() {
    this.resizingColIndicator.nativeElement.style.display = 'none';
  }

  ngOnDestroy(): void {
    if (this.resizingSubscription) {
      this.resizingSubscription.unsubscribe();
    }
  }

  // Popover

  showFilterPopover(column: TableColumn, event: MouseEvent) {
    const domainSubject = new ReplaySubject<PaginatedResponse<string>>();
    const dataRequestSubject = new Subject<ComboDataRequest>();
    this.popoverFilterService.showPopover(
      column, event, domainSubject,
      this.popoverFilters[column.key], dataRequestSubject)
      .subscribe(filterOption => {
        this.popoverFilters[column.key] = filterOption;
        this.grootTable.reloadTable(true);
      });

    dataRequestSubject.subscribe((comboDataRequest: ComboDataRequest) => {
      // Request domains data
      const filters = this.getFilters().filter(f => f.column !== column.columnName);
      this.searchPopoverNeedsData.emit({...comboDataRequest, column, filters, domainSubject});
    });
  }

  onSearch(event: PaginationOptions) {
    this.search.emit({
      ...event,
      filters: this.getFilters()
    });
  }

  private getFilters(): FilterOption[] {
    return this.selectedColumns
      .map(c => this.popoverFilters[c.key])
      .filter(f => f);
  }

  // noinspection JSUnusedGlobalSymbols
  reloadTable(resetPageNumber = false, resetSortField = false) {
    this.grootTable.reloadTable(resetPageNumber, resetSortField);
  }

  // noinspection JSUnusedGlobalSymbols
  resetFilters() {
    this.popoverFilters = {};
    this.reloadTable(true);
  }

  toggleAccordion(row: any) {
    if (this.accordionColumns.length > 0) {
      row.$accordionVisible = !row.$accordionVisible;
    }
  }
}
