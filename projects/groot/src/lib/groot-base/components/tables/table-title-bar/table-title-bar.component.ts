import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginatedResponse} from '../../../utils/pagination.model';

interface PageInfo {
  startRowIdx: number;
  endRowIdx: number;
  totalItems: number;
}

@Component({
  selector: 'groot-table-title-bar',
  templateUrl: './table-title-bar.component.html'
})
export class TableTitleBarComponent {
  @Input() label = 'common.searchResults';
  @Input() showRefreshIcon: boolean = false;
  @Input() downloadExcelLabel = 'common.downloadExcel';
  @Input() downloadExcelUrl: string = null;
  @Input() downloadExcelUrlProvider: () => string = null;
  @Input() downloadExcelArgsProvider: () => object = null;
  @Output() refresh = new EventEmitter<void>();
  pageInfo: PageInfo | null = null;
  loading: Boolean = false;

  @Input() set searchResults(data: PaginatedResponse<any>) {
    this.loading = false;
    if (data) {
      this.pageInfo = {
        startRowIdx: data.pageNum * data.pageLen + 1,
        endRowIdx: Math.min((data.pageNum + 1) * data.pageLen, data.totalNumRecords),
        totalItems: data.totalNumRecords
      };
    } else {
      this.pageInfo = null;
    }
  }

  refreshTable() {
    this.loading = true;
    this.refresh.emit();
  }
}
