import {getEaster, getTarget2HolidaysForYear, isSaturdayOrSunday, isTarget2Holiday} from './date-holidays-utils';

describe('Easter and week end', () => {
  it('can get the Easter date', () => {
    expect(getEaster(2021)).toEqual(new Date(2021, 3, 4));
  });

  it('can detect a saturday date', () => {
    expect(isSaturdayOrSunday(new Date(2021, 3, 3))).toBeTrue();
  });

  it('can detect a sunday date', () => {
    expect(isSaturdayOrSunday(new Date(2021, 3, 4))).toBeTrue();
  });
});

describe('Is Target2 Holidays', () => {
  it('can detect a First of May', () => {
    expect(isTarget2Holiday(new Date(2021, 4, 1))).toBeTrue();
  });

  it('can detect a Christmas Day', () => {
    expect(isTarget2Holiday(new Date(2021, 11, 25))).toBeTrue();
  });

  it('can detect a Saint Stephen Day', () => {
    expect(isTarget2Holiday(new Date(2021, 11, 26))).toBeTrue();
  });

  it('can detect a Good Friday', () => {
    expect(isTarget2Holiday(new Date(2021, 3, 2))).toBeTrue();
  });

  it('can detect a Easter Monday', () => {
    expect(isTarget2Holiday(new Date(2021, 3, 5))).toBeTrue();
  });

});

describe('Get Target2 Holidays', () => {
  it('Can find Target2 Holidays', () => {
    const taarget2Holidays = getTarget2HolidaysForYear(2021);
    expect(
      taarget2Holidays.find(date => date.getTime() === new Date(2021, 0, 1).getTime()) !== null
      && taarget2Holidays.find(date => date.getTime() === new Date(2021, 3, 2).getTime()) !== null
      && taarget2Holidays.find(date => date.getTime() === new Date(2021, 3, 5).getTime()) !== null
      && taarget2Holidays.find(date => date.getTime() === new Date(2021, 4, 1).getTime()) !== null
      && taarget2Holidays.find(date => date.getTime() === new Date(2021, 11, 25).getTime()) !== null
      && taarget2Holidays.find(date => date.getTime() === new Date(2021, 11, 26).getTime()) !== null
    ).toBeTrue();
  });
});
