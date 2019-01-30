import {Input, OnChanges, SimpleChanges} from '@angular/core';
import {PaginatedResponse, PaginationOptions, Sorting} from '../nbpu.interfaces';

/**
 * Base class for components that need to display a backend-paginated, sortable table.
 * Your actual component class must implement the methods "doSearch" and "getDefaultSortColumn".
 * The template should be similar to this example:
 * @example
 * <div *ngIf="searchResults">
 *   <table class="table">
 *     <thead>
 *     <tr>
 *       <th>
 *         <groot-table-header label="name"
 *                            columnName="DB_NAME" [(sort)]="sorting"></groot-table-header>
 *       </th>
 *     </tr>
 *     </thead>
 *     <tbody>
 *     <tr *ngFor="let row of searchResults.records">
 *       <td>{{row.name}}</td>
 *     </tr>
 *     </tbody>
 *   </table>
 *   <groot-table-pagination
 *     [totalItems]="searchResults.totalNumRecords"
 *     [pageSize]="pageSize"
 *     (pageNumChange)="onPageChanged($event)"
 *     [loadedPageNum]="searchResults.pageNum"
 *   ></groot-table-pagination>
 * </div>
 */
export abstract class GenericTableComponentBase<T> implements OnChanges {
  public pageSize = 15;
  // noinspection JSUnusedGlobalSymbols
  public searchResults: PaginatedResponse<T> = null;
  private _sorting: Sorting = {column: this.getDefaultSortColumn(), reverse: this.getDefaultSortReverseFlag()};
  private _currentPageNum = 0;

  ngOnChanges(changes: SimpleChanges): void {
    // Form changed, so reset to first page and reload
    this._currentPageNum = 0;
    this.reload();
  }

  onPageChanged(newPageNum: number): void {
    this._currentPageNum = newPageNum;
    this.reload();
  }

  @Input()
  set sorting(sorting: Sorting) {
    this._sorting = sorting;
    this.reload();
  }

  get sorting() {
    return this._sorting;
  }

  private reload() {
    this.doSearch({
      sortField: this._sorting.column || this.getDefaultSortColumn(),
      sortReversed: this._sorting.reverse,
      pageNum: this._currentPageNum,
      pageLen: this.pageSize
    });
  }

  protected abstract getDefaultSortColumn(): string;

  // noinspection JSMethodCanBeStatic
  protected getDefaultSortReverseFlag(): boolean {
    return false;
  }

  protected abstract doSearch(paginationAndSorting: PaginationOptions);
}
