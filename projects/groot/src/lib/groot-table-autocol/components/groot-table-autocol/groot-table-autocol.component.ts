import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Subject, Subscription} from 'rxjs';
import {ColumnsSelectorComponent} from './columns-selector/columns-selector.component';
import {SelectedColumns, TableColumn, TableColumnRendering, TableColumns} from '../../model/table-columns.model';
import {dropDownOnCreateAnimation} from '../../../groot-base/utils/animations-utils';
import {PaginatedResponse, PaginationOptions} from '../../../groot-base/nbpu.interfaces';
import {ElementResizingHandler} from '../../../groot-base/utils/element-resizing-handler';
import {LoadingFailed} from '../../../groot-base/components/tables/groot-table/groot-table.component';

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
export class GrootTableAutocolComponent<T> implements OnDestroy {
  // Groot-table inputs
  @Input() downloadExcelLabel = 'common.downloadExcel';
  @Input() downloadExcelUrl: string | null;
  @Input() downloadExcelUrlProvider: () => string | null;
  @Input() downloadExcelArgs: () => any | null;
  @Input() defaultSortColumn: string;
  @Input() defaultSortReverseFlag = false;
  @Input() pageSize = 15;
  @Input() tableClassName: string | string[] = '';
  @Input() tHeadClassName: string | string[] = 'thead-primary';
  @Input() trClassName: string | string[] = 'text-nowrap';
  @Input() hideTableIfEmpty = true;
  @Output() search = new EventEmitter<PaginationOptions>();
  @Input() searchResultsData: PaginatedResponse<T> | LoadingFailed;

  // Column selector
  @Input() availableColumns: TableColumns;
  @Input() selectedColumns: TableColumns;
  @Input() accordionColumns: TableColumns;
  @Output() columnsSelectionChanged = new EventEmitter<SelectedColumns>();
  @Output() columnResized = new EventEmitter<ColumnAndWidth>();

  TableColumnRendering = TableColumnRendering;
  private resizingSubscription: Subscription;
  @ViewChild('resizingColIndicator') resizingColIndicator: ElementRef;

  constructor(private bsModalService: BsModalService) {
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
}
