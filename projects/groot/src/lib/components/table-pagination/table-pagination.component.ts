import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'groot-table-pagination',
  templateUrl: './table-pagination.component.html'
})
export class TablePaginationComponent {
  _pageNum = 0;
  _totalItems: number | null = null;
  _pageSize = 10;
  _numPages = 0;

  @Output() public pageNumChange = new EventEmitter<number>();

  @Input()
  public set loadedPageNum(newPageNum: number) {
    this._pageNum = newPageNum;
    this.compute();
  }

  @Input()
  public set pageNum(newPageNum: number) {
    if (newPageNum !== this._pageNum) {
      this._pageNum = newPageNum;
      this.pageNumChange.emit(this._pageNum);
      this.compute();
    }
  }

  @Input()
  public set totalItems(newTotalItems: number | null) {
    this._totalItems = newTotalItems;
    this.compute();
  }

  @Input()
  public set pageSize(newPageSize: number) {
    if (newPageSize > 0) {
      this._pageSize = newPageSize;
      this.compute();
    }
  }

  private compute(): void {
    if (this._totalItems < 1) {
      return;
    }

    this._numPages = Math.trunc((this._totalItems - 1) / this._pageSize) + 1;
  }

  public goDirectlyToPage(n: number) {
    if (n >= 0 && n < this._numPages) {
      this.pageNum = n;
    }
  }
}
