import {FtTimePipe} from './ft-time.pipe';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';

// Enable italian locale
registerLocaleData(localeIt);

describe('FtTimePipe', () => {
  it('can print a string with default time format', () => {
    const pipe = new FtTimePipe();
    expect(pipe.transform('12131401')).toEqual('12:13');
    expect(pipe.transform('4553001')).toEqual('04:55');
  });

  it('can print a number with default time format', () => {
    const pipe = new FtTimePipe();
    expect(pipe.transform(12131401)).toEqual('12:13');
    expect(pipe.transform(4553001)).toEqual('04:55');
  });

  it('respects the given time format', () => {
    const pipe = new FtTimePipe();
    expect(pipe.transform('12131401', 'hh:mm:ss')).toEqual('12:13:14');
  });

  it('blank string input value', () => {
    const pipe = new FtTimePipe();
    expect(pipe.transform(' ', 'hh:mm:ss')).toEqual(null);
  });

  it('empty string input value', () => {
    const pipe = new FtTimePipe();
    expect(pipe.transform('', 'hh:mm:ss')).toEqual(null);
  });

  it('null string input value', () => {
    const pipe = new FtTimePipe();
    expect(pipe.transform(null, 'hh:mm:ss')).toEqual(null);
  });
});
