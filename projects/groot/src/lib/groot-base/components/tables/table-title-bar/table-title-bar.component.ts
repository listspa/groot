import {Component, Input} from '@angular/core';
import {PaginatedResponse} from '../../../nbpu.interfaces';

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
  @Input() downloadExcelLabel = 'common.downloadExcel';
  @Input() downloadExcelUrl: string = null;
  @Input() downloadExcelUrlProvider: () => string = null;
  @Input() downloadExcelArgsProvider: () => object = null;
  pageInfo: PageInfo | null = null;

  @Input() set searchResults(data: PaginatedResponse<any>) {
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
}
