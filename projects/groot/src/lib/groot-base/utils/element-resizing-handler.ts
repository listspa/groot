import {fromEvent, Observable} from 'rxjs';
import {map, takeUntil, tap} from 'rxjs/operators';
import {WidthHeight, XY} from './geometry.model';

export class ElementResizingHandler<T> {
  private readonly startPos: XY;
  private readonly startSize: WidthHeight;

  constructor(event: MouseEvent,
              public readonly element: HTMLElement,
              public data: T = null) {
    this.startPos = {x: event.screenX, y: event.screenY};
    this.startSize = {width: element.offsetWidth, height: element.offsetHeight};
    event.stopImmediatePropagation();
  }

  startHandlingResizing(): Observable<WidthHeight> {
    return fromEvent(window.document.body, 'mousemove')
      .pipe(
        takeUntil(fromEvent(window.document.body, 'mouseup')),
        tap((e: MouseEvent) => e.stopImmediatePropagation()),
        map((e: MouseEvent) => this.calculateNewSize(e)),
      );
  }

  calculateNewSize(event: MouseEvent): WidthHeight {
    return {
      width: this.startSize.width + event.screenX - this.startPos.x,
      height: this.startSize.height + event.screenY - this.startPos.y,
    };
  }
}
