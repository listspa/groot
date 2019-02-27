import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {PaginatedResponse, PaginationOptions, Sorting} from '../../../nbpu.interfaces';

@Component({
  selector: 'groot-table',
  templateUrl: './groot-table.component.html'
})
export class GrootTableComponent<T> implements OnInit {
  @Input() downloadExcelUrl: string | null;
  @Input() downloadExcelUrlProvider: () => string | null;
  @Input() downloadExcelArgs: () => any | null;
  @Input() defaultSortColumn: string;
  @Input() defaultSortReverseFlag = false;
  @Input() pageSize = 15;
  @Input() tHeadClassName: string | string[] = 'thead-primary';
  @Input() striped = true;
  @Input() headerTemplate: TemplateRef<any>;
  @Input() bodyTemplate: TemplateRef<any>;
  @Output() search = new EventEmitter<PaginationOptions>();
  public searchResults: PaginatedResponse<T> = null;
  public sorting: Sorting;
  private _currentPageNum = 0;
  public setSortingCbk = this.setSorting.bind(this);

  ngOnInit(): void {
    this.sorting = {column: this.defaultSortColumn, reverse: this.defaultSortReverseFlag};
    this.reloadTable(true);
  }

  @Input() set searchResultsData(searchResultsData: PaginatedResponse<T>) {
    this.searchResults = searchResultsData;
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

  reloadTable(resetPageNumber = false) {
    if (!this.sorting) {
      // Before our ngOnInit
      return;
    }

    if (resetPageNumber) {
      this._currentPageNum = 0;
    }

    this.search.emit({
      sortField: this.sorting.column || this.defaultSortColumn,
      sortReversed: this.sorting.reverse,
      pageNum: this._currentPageNum,
      pageLen: this.pageSize
    });
  }
}
