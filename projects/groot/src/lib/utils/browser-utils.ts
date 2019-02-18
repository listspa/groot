/**
 * Returns true when we are running inside IE11 and false otherwise.
 * See https://stackoverflow.com/questions/21825157/internet-explorer-11-detection
 */
export function isInternetExplorer11(): boolean {
  return !!(window as any).MSInputMethodContext && !!(document as any).documentMode;
}

/**
 * Returns true when we are running inside Edge and false otherwise.
 * See https://stackoverflow.com/questions/31721250/how-to-target-windows-10-edge-browser-with-javascript
 */
export function isEdge(): boolean {
  return /Edge/.test(navigator.userAgent);
}

export function isIe11OrEdge(): boolean {
  return isInternetExplorer11() || isEdge();
}
