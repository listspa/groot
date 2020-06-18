export function deepCopy<T>(element: T): T {
  return JSON.parse(JSON.stringify(element));
}

export function deepCompare(element1: any, element2: any): boolean {
  return JSON.stringify(element1) === JSON.stringify(element2);
}
