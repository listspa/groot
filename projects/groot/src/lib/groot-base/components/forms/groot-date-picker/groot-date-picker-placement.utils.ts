import {ElementRef} from '@angular/core';

export type Placement = 'bottom' | 'top' | 'left' | 'right';

export function calculateDatePickerPosition(element: ElementRef): Placement {
  const position: Placement = 'bottom';

  if (
    !element?.nativeElement?.childNodes ||
    !element.nativeElement.childNodes[2] ||
    !element.nativeElement.childNodes[2].getBoundingClientRect) {
    return position;
  }

  const rect: DOMRect = element.nativeElement.childNodes[2].getBoundingClientRect();

  const height = 315;
  const width = 308;

  const topDistance = rect.height + rect.top;
  const bottomDistance = (window.innerHeight - rect.top) - rect.height;
  const leftDistance = rect.width + rect.left;
  const rightDistance = (window.innerWidth - rect.left) - rect.width;

  if (topDistance > height && height > bottomDistance) {
    return 'top';
  }

  if (rightDistance > width && width > leftDistance) {
    return 'right';
  }

  return position;
}
