import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {PaginatedResponse, PaginationOptions, Sorting} from '../../../utils/pagination.model';
import {GrootTableBodyDirective, GrootTableHeaderDirective, GrootTableTitleRightAreaDirective} from './groot-table.directive';

export interface LoadingFailed {
  loadingFailed: true;
}

export function isLoadingFailed<T>(t: PaginatedResponse<T> | LoadingFailed): t is LoadingFailed {
  return t && t.hasOwnProperty('loadingFailed') && (t as any).loadingFailed === true;
}

@Component({
  selector: 'groot-table',
  templateUrl: './groot-table.component.html'
})
export class GrootTableComponent<T> implements OnInit {
  @Input() hideTitleBar = false;
  @Input() showRefreshIcon = false;
  @Input() lastRefreshTimestamp: Date | string = null;
  @Input() downloadExcelLabel = 'common.downloadExcel';
  @Input() downloadExcelUrl: string | null;
  @Input() downloadExcelUrlProvider: () => string | null;
  @Input() downloadExcelArgs: () => any | null;
  @Input() defaultSortColumn: string;
  @Input() defaultSortReverseFlag = false;
  @Input() pageSize = 15;
  @Input() tableClassName: string | string[] = '';
  @Input() tHeadClassName: string | string[] = 'thead-primary';
  @Input() striped = true;
  @Input() selectable = false;
  @Input() hideTableIfEmpty = true;
  @Input() @ContentChild(GrootTableHeaderDirective, {read: TemplateRef}) headerTemplate: TemplateRef<any>;
  @Input() @ContentChild(GrootTableBodyDirective, {read: TemplateRef}) bodyTemplate: TemplateRef<any>;
  @Input() @ContentChild(GrootTableTitleRightAreaDirective, {read: TemplateRef}) tableTitleRightArea: TemplateRef<any>;
  @Output() search = new EventEmitter<PaginationOptions>();
  public searchResults: PaginatedResponse<T> = null;
  public sorting: Sorting;
  private _currentPageNum = 0;
  public setSortingCbk = this.setSorting.bind(this);
  public failed = false;

  ngOnInit(): void {
    this.sorting = {column: this.defaultSortColumn, reverse: this.defaultSortReverseFlag};
    this.reloadTable(true);
  }

  @Input() set searchResultsData(searchResultsData: PaginatedResponse<T> | LoadingFailed) {
    if (isLoadingFailed(searchResultsData)) {
      this.failed = true;
      this.searchResults = null;
    } else {
      this.failed = false;
      this.searchResults = searchResultsData;
    }
  }

  onPageChanged(newPageNum: number): void {
    this._currentPageNum = newPageNum;
    this.reloadTable(false);
  }

  setSorting(sorting: Sorting) {
    this.sorting = sorting;
    this.reloadTable(false);
  }

  currentSorting(): Sorting {
    return this.sorting;
  }

  reloadTable(resetPageNumber = false, resetSortField = false) {
    if (!this.sorting) {
      // Before our ngOnInit
      return;
    }

    if (resetPageNumber) {
      this._currentPageNum = 0;
    }

    if (resetSortField) {
      this.sorting.column = this.defaultSortColumn;
      this.sorting.reverse = this.defaultSortReverseFlag;
    }

    this.search.emit({
      sortField: this.sorting.column || this.defaultSortColumn,
      sortReversed: this.sorting.reverse,
      pageNum: this._currentPageNum,
      pageLen: this.pageSize
    });
  }
}
