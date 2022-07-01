import {ChangeDetectorRef, Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {normalizeNgBootstrapDateFormat} from '../../components/forms/groot-date-picker/groot-date-picker-config';

/**
 * Can format an SKLDate (yyyyMMdd).
 */
@Pipe({
  name: 'ftDate'
})
export class FtDatePipe implements PipeTransform {
  private defaultDateFormat: string;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              bsDatepickerConfig: BsDatepickerConfig) {
    this.defaultDateFormat = normalizeNgBootstrapDateFormat(bsDatepickerConfig.dateInputFormat);
  }

  transform(dateObj: any,
            dateFormat: string = this.defaultDateFormat,
            timezone: string = 'it'): any {
    if (!dateObj) {
      return null;
    }
    const dateStr = dateObj.toString();
    if (dateStr.trim() === '' || dateStr === '0') {
      return null;
    }
    const yyyy = parseInt(dateStr.substr(0, 4), 10);
    const mm = parseInt(dateStr.substr(4, 2), 10);
    const dd = parseInt(dateStr.substr(6, 2), 10);
    const jsDate = new Date(yyyy, mm - 1, dd);
    return formatDate(jsDate, dateFormat, timezone);
  }
}
