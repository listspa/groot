/**
 * Ensures that the given input string is long enough, adding characters to the left
 * until necessary.
 */
export function leftPad(input: any, desiredLength: number, fillChar: string): string {
  let str = input.toString();
  while (str.length < desiredLength) {
    str = fillChar + str;
  }
  return str;
}

/**
 * Ensures that the given input string is long enough, adding characters to the right
 * until necessary.
 */
export function rightPad(input: any, desiredLength: number, fillChar: string): string {
  let str = input.toString();
  while (str.length < desiredLength) {
    str = str + fillChar;
  }
  return str;
}
