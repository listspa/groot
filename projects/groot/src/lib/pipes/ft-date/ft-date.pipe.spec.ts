import {FtDatePipe} from './ft-date.pipe';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';

// Enable italian locale
registerLocaleData(localeIt);

describe('FtDatePipe', () => {
  it('can print a string with default date format', () => {
    const pipe = new FtDatePipe();
    expect(pipe.transform('20141225')).toEqual('25/12/2014');
  });

  it('respects the given date format', () => {
    const pipe = new FtDatePipe();
    expect(pipe.transform('20141225', 'yyyy-MM-dd')).toEqual('2014-12-25');
  });
});
