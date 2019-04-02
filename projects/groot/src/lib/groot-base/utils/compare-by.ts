export type Comparator<T> = (a: T, b: T) => number;

/**
 * Function to help sort an array of objects by a property
 */
export function compareBy<T>(property: string, reverse = false): Comparator<T> {
  const cmp = function (e1, e2) {
    const v1 = e1[property];
    const v2 = e2[property];

    if (typeof v1 === 'number' && typeof v2 === 'number') {
      return v1 > v2 ? +1 : (v1 < v2 ? -1 : 0);
    } else {
      // Nulls last
      if (v1 === null || v1 === undefined) {
        if (v2 === null || v2 === undefined) {
          return 0;
        } else {
          return +1;
        }
      } else if (v2 === null || v2 === undefined) {
        return -1;
      } else {
        return v1.toString().localeCompare(v2.toString());
      }
    }
  };

  return reverse ? reverseComparator(cmp) : cmp;
}

/**
 * Reverses a comparator, useful to sort in inverse order
 */
export function reverseComparator<T>(comparator: Comparator<T>): Comparator<T> {
  return (a, b) => -comparator(a, b);
}
