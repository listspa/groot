import {isoDate, isoDateNullable} from './date-utils';

describe('isoDate', () => {
  it('can print a date which does not require padding', () => {
    expect(isoDate(new Date(2020, 11, 31))).toEqual('2020-12-31');
  });

  it('can print a date which does requires padding', () => {
    expect(isoDate(new Date(2018, 0, 1))).toEqual('2018-01-01');
  });
});

describe('isoDateNullable', () => {
  it('can print a date', () => {
    expect(isoDateNullable(new Date(2018, 0, 1))).toEqual('2018-01-01');
  });

  it('returns null on null input', () => {
    expect(isoDateNullable(null)).toBeNull();
  });
});
