import {getEaster, isSaturdayOrSunday, isTarget2Holiday} from "./date-holidays-utils";

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

describe('Target2 Holidays', () => {
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
