import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginatedResponse} from '../../../utils/pagination.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {normalizeNgBootstrapDateFormat} from '../../forms/groot-date-picker/groot-date-picker-config';

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
  @Input() showRefreshIcon = false;
  @Input() showPageInfo = true;
  @Input() lastRefreshTimestamp: Date | string;
  @Input() downloadExcelLabel = 'common.downloadExcel';
  @Input() downloadExcelUrl: string = null;
  @Input() downloadExcelUrlProvider: () => string = null;
  @Input() downloadExcelArgsProvider: () => object = null;
  @Input() downloadExcelIsAjax = false;
  @Input() downloadExcelFileName = 'download.xlsx';
  @Output() refresh = new EventEmitter<void>();
  pageInfo: PageInfo | null = null;
  loading = false;
  dateFormat: string;

  constructor(bsDatepickerConfig: BsDatepickerConfig) {
    this.dateFormat = normalizeNgBootstrapDateFormat(bsDatepickerConfig.dateInputFormat);
  }

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
