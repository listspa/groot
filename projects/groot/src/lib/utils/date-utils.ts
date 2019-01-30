import {leftPad} from './string-utils';

/**
 * Given a date, returns a string with its ISO representation.
 */
export function isoDate(date: Date): string {
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${yy}-${leftPad(mm, 2, '0')}-${leftPad(dd, 2, '0')}`;
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
