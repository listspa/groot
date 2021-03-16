import {WeekDay} from "@angular/common";

/**
 * Given a year, it returns a Date object for the easter of that year.
 */
export function getEaster(year: number): Date {
  let f = Math.floor,
    // Golden Number - 1
    G = year % 19,
    C = f(year / 100),
    // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    // number of days from 21 March to the Paschal full moon
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);

  return new Date(year, month - 1, day);
}

/**
 * Given a Date, it returns whether is a sunday or a saturday.
 */
export function isSaturdayOrSunday(theDate: Date): boolean {
  return theDate.getDay() == WeekDay.Saturday || theDate.getDay() == WeekDay.Sunday;
}

/**
 * Given a Date, it returns true if it is First of May, Christmas, Saint Stephen, First Year's Day,
 * Easter Monday or Good Friday, false otherwise.
 */
export function isTarget2Holiday(theDate: Date): boolean {
  let isFirstOfMay = theDate.getMonth() == 4 && theDate.getDate() == 1; // Labor Day
  let christmasDay = theDate.getMonth() == 11 && theDate.getDate() == 25; // Christmas
  let saintStephenDay = theDate.getMonth() == 11 && theDate.getDate() == 26; // Saint Stephan
  let firstYearDay = theDate.getMonth() == 0 && theDate.getDate() == 1; // First Year's Day
  let easterDayDate = getEaster(theDate.getFullYear());
  let easterDayDateTemp = new Date(easterDayDate.getTime());
  let easterMondayDate = new Date(easterDayDateTemp.setDate(easterDayDate.getDate() + 1));
  let goodFridayDate = new Date(easterDayDateTemp.setDate(easterDayDate.getDate() - 2));
  let easterMonday = theDate.getMonth() == easterMondayDate.getMonth() && theDate.getDate() == easterMondayDate.getDate(); // Easter Monday
  let goodFriday = theDate.getMonth() == goodFridayDate.getMonth() && theDate.getDate() == goodFridayDate.getDate(); // Good Friday

  return isFirstOfMay ||
    christmasDay ||
    saintStephenDay ||
    firstYearDay ||
    easterMonday ||
    goodFriday;
}
