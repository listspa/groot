import {WeekDay} from '@angular/common';

/**
 * Given a year, it returns a Date object for the Easter of that year.
 */
export function getEaster(year: number): Date {
  const f = Math.floor;
  // Golden Number - 1
  const G = year % 19;
  const C = f(year / 100);
  // related to Epact
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  // number of days from 21 March to the Paschal full moon
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  // weekday for the Paschal full moon
  const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
  // number of days from 21 March to the Sunday on or before the Paschal full moon
  const L = I - J;
  const month = 3 + f((L + 40) / 44);
  const day = L + 28 - 31 * f(month / 4);

  return new Date(year, month - 1, day);
}

/**
 * Given a Date, it returns whether is a sunday or a saturday.
 */
export function isSaturdayOrSunday(theDate: Date): boolean {
  return theDate.getDay() === WeekDay.Saturday || theDate.getDay() === WeekDay.Sunday;
}

/**
 * Given a Date, it returns true if it is First of May, Christmas, Saint Stephen, First Year's Day,
 * Easter Monday or Good Friday, false otherwise.
 */
export function isTarget2Holiday(theDate: Date): boolean {
  const isFirstOfMay = theDate.getMonth() === 4 && theDate.getDate() === 1; // Labor Day
  const isChristmasDay = theDate.getMonth() === 11 && theDate.getDate() === 25; // Christmas
  const isSaintStephenDay = theDate.getMonth() === 11 && theDate.getDate() === 26; // Saint Stephan
  const isFirstYearDay = theDate.getMonth() === 0 && theDate.getDate() === 1; // First Year's Day
  const easterDayDate = getEaster(theDate.getFullYear());
  const easterDayDateTemp = new Date(easterDayDate.getTime());
  const easterMondayDate = new Date(easterDayDateTemp.setDate(easterDayDate.getDate() + 1));
  const goodFridayDate = new Date(easterDayDateTemp.setDate(easterDayDate.getDate() - 2));
  const isEasterMonday = theDate.getMonth() === easterMondayDate.getMonth() && theDate.getDate() === easterMondayDate.getDate(); // Easter Monday
  const isGoodFriday = theDate.getMonth() === goodFridayDate.getMonth() && theDate.getDate() === goodFridayDate.getDate(); // Good Friday

  return isFirstOfMay ||
    isChristmasDay ||
    isSaintStephenDay ||
    isFirstYearDay ||
    isEasterMonday ||
    isGoodFriday;
}

export function getTarget2HolidaysForYear(year: number): Date[] {
  const firstOfMay = new Date(year, 4, 1); // Labor Day
  const christmasDay = new Date(year, 11, 25); // Christmas
  const saintStephenDay = new Date(year, 11, 26); // Saint Stephan
  const firstYearDay = new Date(year, 0, 1); // First Year's Day
  const easterDayDate = getEaster(year);
  const easterDayDateTemp = new Date(easterDayDate.getTime());
  const easterMondayDate = new Date(easterDayDateTemp.setDate(easterDayDate.getDate() + 1));
  const goodFridayDate = new Date(easterDayDateTemp.setDate(easterDayDate.getDate() - 2));

  return [firstOfMay, christmasDay, saintStephenDay, firstYearDay, easterMondayDate, goodFridayDate];
}
