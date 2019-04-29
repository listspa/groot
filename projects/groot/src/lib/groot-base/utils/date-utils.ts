import {leftPad} from './string-utils';

/**
 * Given a date, returns a string with its ISO representation.
 */
export function isoDate(date: Date): string {
  return sprintfInternal(date, "-");
}

/**
 * Given a date, returns a string with its ISO representation.
 * Given null or undefined, returns null.
 */
export function isoDateNullable(date: Date | null | undefined): string | null {
  if (date) {
    return isoDate(date);
  } else {
    return null;
  }
}

/**
 * Given a string containing a date in ISO form, or a date object,
 * returns a date object.
 */
export function parseDate(date: string | Date): Date {
  if (typeof date === 'string') {
    // year-month-day
    const parts = date.split('-');
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  } else {
    return date;
  }
}

/**
 * Given a date and an (optional) separator, returns a string with its representation in YYYYMMDD format.
 * Given null or undefined, returns null.
 */
export function sprintfYYYYMMDD(date: Date | null | undefined, separator: string = ""): string | null {
  if (date) {
    return sprintfInternal(date, separator);
  } else {
    return null;
  }
}

function sprintfInternal(date: Date | null | undefined, separator: string = ""): string {
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${yy}${separator}${leftPad(mm, 2, '0')}${separator}${leftPad(dd, 2, '0')}`;
}
