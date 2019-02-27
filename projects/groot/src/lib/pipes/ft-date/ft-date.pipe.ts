import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';

/**
 * Can format an SKLDate (yyyyMMdd).
 */
@Pipe({
  name: 'ftTime'
})
export class FtDatePipe implements PipeTransform {
  transform(date: string,
            dateFormat: string = 'dd/MM/yyyy',
            timezone: string = 'it'): any {
    const yyyy = parseInt(date.substr(0, 4), 10);
    const mm = parseInt(date.substr(4, 2), 10);
    const dd = parseInt(date.substr(6, 2), 10);
    const jsDate = new Date(yyyy, mm - 1, dd);
    return formatDate(jsDate, dateFormat, timezone);
  }
}
