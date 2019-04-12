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

  it('can print a number with default date format', () => {
    const pipe = new FtDatePipe();
    expect(pipe.transform(20141225)).toEqual('25/12/2014');
  });

  it('respects the given date format', () => {
    const pipe = new FtDatePipe();
    expect(pipe.transform('20141225', 'yyyy-MM-dd')).toEqual('2014-12-25');
    expect(pipe.transform(20141225, 'yyyy-MM-dd')).toEqual('2014-12-25');
  });

  it('zero input value', () => {
    const pipe = new FtDatePipe();
    expect(pipe.transform(0, 'yyyy-MM-dd')).toEqual(null);
  });

  it('blank string input value', () => {
    const pipe = new FtDatePipe();
    expect(pipe.transform(' ', 'yyyy-MM-dd')).toEqual(null);
  });

  it('empty string input value', () => {
    const pipe = new FtDatePipe();
    expect(pipe.transform('', 'yyyy-MM-dd')).toEqual(null);
  });

  it('null string input value', () => {
    const pipe = new FtDatePipe();
    expect(pipe.transform(null, 'yyyy-MM-dd')).toEqual(null);
  });
});
