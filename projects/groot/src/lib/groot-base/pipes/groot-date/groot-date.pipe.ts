import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';

/**
 * Convert a string in a date, according to the givent format (default: dd-MMM-yy).
 */
@Pipe({
  name: 'grootDate'
})
export class GrootDatePipe implements PipeTransform {
  private _monthsArray = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


  transform(dateObj: any,
            inputDateFormat: 'yyyy-MM-dd' | 'dd-MMM-yy' | 'dd-MMM-yyyy' = 'yyyy-MM-dd',
            outputDateFormat: string = 'dd/MM/yyyy',
            timezone: string = 'it'): any {
    if (!dateObj) {
      return null;
    }
    let dateStr = dateObj.toString();
    if (dateStr.trim() === '' || dateStr === '0') {
      return null;
    }

    dateStr = this.parseInputDateFormat(dateStr, inputDateFormat);

    const yyyy = parseInt(dateStr.substr(0, 4), 10);
    const mm = parseInt(dateStr.substr(4, 2), 10);
    const dd = parseInt(dateStr.substr(6, 2), 10);
    const jsDate = new Date(yyyy, mm - 1, dd);
    return formatDate(jsDate, outputDateFormat, timezone);
  }

  private parseInputDateFormat(dateStr: string, inputDateFormat: string) {
    let transformedDateString = '';
    switch (inputDateFormat) {
      case 'yyyy-MM-dd': {
        const re = /-/gi;
        dateStr = dateStr.replace(re, '');
        const year = dateStr.substr(0, 4);
        const month = dateStr.substr(4, 2);
        const day = dateStr.substr(6, 2);
        transformedDateString = year.concat(month, day);
        break;
      }
      case 'dd-MMM-yy': {
        const re = /-/gi;
        dateStr = dateStr.replace(re, '');
        const day = dateStr.substr(0, 2);
        const idx = this._monthsArray.indexOf(dateStr.substr(2, 3)) + 1;
        const month = idx < 10 ? '0' + idx : idx.toString();
        let year = dateStr.substr(5, 2);
        year = parseInt(year, 10) <= 30 ? '20'.concat(year) : '19'.concat(year);
        transformedDateString = year.concat(month, day);
        break;
      }
      case 'dd-MMM-yyyy': {
        const re = /-/gi;
        dateStr = dateStr.replace(re, '');
        const day = dateStr.substr(0, 2);
        const idx = this._monthsArray.indexOf(dateStr.substr(2, 3)) + 1;
        const month = idx < 10 ? '0' + idx : idx.toString();
        const year = dateStr.substr(5, 4);
        transformedDateString = year.concat(month, day);
        break;
      }
    }
    return transformedDateString;
  }
}
