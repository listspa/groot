import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';
import {leftPad} from '../../utils/string-utils';

/**
 * Can format an SKLTime (HHMMSS00).
 */
@Pipe({
  name: 'ftTime'
})
export class FtTimePipe implements PipeTransform {
  transform(time: string,
            timeFormat: string = 'HH:mm',
            timezone: string = 'it'): any {
    if (time && time.trim() !== '') {
      const normalizedTime = leftPad(time, 8, '0');
      const hh = parseInt(normalizedTime.substr(0, 2), 10);
      const mm = parseInt(normalizedTime.substr(2, 2), 10);
      const ss = parseInt(normalizedTime.substr(4, 2), 10);
      const hs = parseInt(normalizedTime.substr(6, 2), 10);
      const date = new Date(2000, 1, 1, hh, mm, ss, hs * 10);
      return formatDate(date, timeFormat, timezone);
    } else {
      return null;
    }
  }
}
