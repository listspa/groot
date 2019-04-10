import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {TableColumn} from '../../model/table-columns.model';
import {PopoverFilterComponent} from './popover-filter/popover-filter.component';
import {fromEvent, Observable, Subject} from 'rxjs';
import {finalize, skip, takeUntil} from 'rxjs/operators';
import {merge} from 'rxjs/internal/observable/merge';
import {ComboDataRequest, PaginatedResponse} from '../../../groot-base/nbpu.interfaces';

// Notes: this service is very much bound to the PopoverFilterComponent.
// However, there's a lot that could be made generic. Eventually we should split it in two;
// the generic part and the hard-coded one.
@Injectable({
  providedIn: 'root'
})
export class PopoverFilterService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  showPopover(column: TableColumn,
              event: MouseEvent,
              domainSubject: Observable<PaginatedResponse<string>>,
              currentValues: string[] | null,
              dataRequest: Subject<ComboDataRequest>)
    : Observable<string[] | null> {
    const resultSubject = new Subject<string[]>();

    const {componentRef, domElem} = this.createComponent();
    this.fillInputs(componentRef, column, resultSubject, currentValues, domainSubject, dataRequest);

    this.setupPositioning(domElem, event, resultSubject);
    this.closeComponentOnClickOutside(domElem, componentRef, resultSubject);

    return resultSubject.pipe(
      finalize(() => this.closeComponent(componentRef)));
  }

  // See https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  private createComponent(): { componentRef: ComponentRef<PopoverFilterComponent>, domElem: HTMLElement } {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(PopoverFilterComponent)
      .create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = this.appendDomElementToBody(componentRef);
    return {componentRef, domElem};
  }

  // noinspection JSMethodCanBeStatic
  private appendDomElementToBody(componentRef): HTMLElement {
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return domElem;
  }

  private fillInputs(componentRef: ComponentRef<PopoverFilterComponent>,
                     column: TableColumn,
                     resultSubject,
                     currentValues: string[] | null,
                     domainSubject: Observable<PaginatedResponse<string>>,
                     dataRequest: Subject<ComboDataRequest>) {
    const popoverFilterComponent = componentRef.instance;
    popoverFilterComponent.column = column;
    popoverFilterComponent.results = resultSubject;
    popoverFilterComponent.selectedValues = currentValues ? [...currentValues] : [];
    popoverFilterComponent.domain$ = domainSubject;
    popoverFilterComponent.dataRequest = dataRequest;
  }

  private setupPositioning(domElem: HTMLElement, event: MouseEvent, cancelObservable: Observable<any>) {
    const target: any = event.target;
    const th = target.closest('th');

    // Initial positioning
    this.position(domElem, th);

    const onResize = fromEvent(window, 'resize');
    const onScroll = fromEvent(th.closest('.table-container'), 'scroll');
    merge(onResize, onScroll)
      .pipe(takeUntil(cancelObservable))
      .subscribe(() => this.position(domElem, th));
  }

  // noinspection JSMethodCanBeStatic
  private position(domElem: HTMLElement, th: HTMLElement) {
    const thRect = th.getBoundingClientRect();

    // TODO: at this point the domElem.offsetWidth is not correct, so we hard code the width
    const popoverW = PopoverFilterService.convertRemToPixels(28.5);
    let left = (thRect.left + th.offsetWidth / 2 - popoverW / 2);
    if (left < 0) {
      left = 10;
    }
    if (left + popoverW > window.innerWidth) {
      left = window.innerWidth - popoverW - 10;
    }

    domElem.style.left = left + 'px';
    domElem.style.top = (thRect.top + th.offsetHeight - 10) + 'px';
  }

  // tslint:disable-next-line:member-ordering
  private static convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  private closeComponentOnClickOutside(domElem: HTMLElement,
                                       componentRef: ComponentRef<any>,
                                       cancelObservable: Observable<any>) {
    // Close when the body receives a click (skipping the current one)
    fromEvent(window, 'click')
      .pipe(
        takeUntil(cancelObservable),
        skip(1),
      )
      .subscribe(() => this.closeComponent(componentRef));

    // ...but avoid bubbling up click events from a click on the popover
    fromEvent(domElem, 'click')
      .pipe(takeUntil(cancelObservable))
      .subscribe(e => e.stopPropagation());

  }

  private closeComponent(componentRef: ComponentRef<any>) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
