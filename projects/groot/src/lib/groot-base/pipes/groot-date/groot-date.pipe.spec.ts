import { GrootDatePipe } from './groot-date.pipe';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';

// Enable italian locale
registerLocaleData(localeIt);

describe('GrootDatePipe', () => {
  it('create an instance', () => {
    const pipe = new GrootDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('can print a string with default date format', () => {
    const pipe = new GrootDatePipe();
    expect(pipe.transform('19-JAN-18')).toEqual('19/01/2018');
  });

  it('can print a string with date format dd-MMM-yy', () => {
    const pipe = new GrootDatePipe();
    expect(pipe.transform('19-JAN-18', 'dd-MMM-yy')).toEqual('19/01/2018');
  });

  it('can print a string with date format dd-MMM-yyyy', () => {
    const pipe = new GrootDatePipe();
    expect(pipe.transform('19-JAN-1918', 'dd-MMM-yyyy')).toEqual('19/01/1918');
  });
});
