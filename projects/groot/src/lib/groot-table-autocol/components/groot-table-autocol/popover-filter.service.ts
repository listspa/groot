import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {TableColumn} from '../../model/table-columns.model';
import {PopoverFilterComponent} from './popover-filter/popover-filter.component';
import {concat, fromEvent, merge, Observable, of, Subject} from 'rxjs';
import {filter, finalize, skip, takeUntil} from 'rxjs/operators';
import {ComboDataRequest, FilterOption, PaginatedResponse} from '../../../groot-base/utils/pagination.model';

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
              currentFilter: FilterOption | null,
              dataRequest: Subject<ComboDataRequest>)
    : Observable<FilterOption | null> {
    const resultSubject = new Subject<FilterOption>();

    const {componentRef, domElem} = this.createComponent();
    this.fillInputs(componentRef, column, resultSubject, currentFilter, domainSubject, dataRequest);

    this.setupPositioning(domElem, event, resultSubject);
    this.closeComponentOnClickOutside(domElem, componentRef, resultSubject);

    return resultSubject.pipe(
      finalize(() => this.closeComponent(componentRef, resultSubject)));
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
                     currentFilter: FilterOption | null,
                     domainSubject: Observable<PaginatedResponse<string>>,
                     dataRequest: Subject<ComboDataRequest>) {
    const popoverFilterComponent = componentRef.instance;
    popoverFilterComponent.column = column;
    popoverFilterComponent.results = resultSubject;
    popoverFilterComponent.currentFilter = currentFilter;
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
                                       resultSubject: Subject<FilterOption>) {
    // When the cancelObservable completes without emitting at least one value,
    // takeUntil is not triggered. So we concatenate it with a dummy observable
    // that will emit *at least* one value.
    const cancelObsWithAtLeastOneValue = concat(resultSubject, of(true));

    // Close when the body receives a click (skipping the current one)
    fromEvent(window, 'click')
      .pipe(
        takeUntil(cancelObsWithAtLeastOneValue),
        skip(1),
        filter(e => {
          // Avoid closing when clicking the date picker's calendar
          return !(e.target as any).closest('.bs-datepicker-body');
        })
      )
      .subscribe(() => this.closeComponent(componentRef, resultSubject));

    // ...but avoid bubbling up click events from a click on the popover
    fromEvent(domElem, 'click')
      .pipe(takeUntil(resultSubject))
      .subscribe(e => e.stopPropagation());

  }

  private closeComponent(componentRef: ComponentRef<any>, resultSubject: Subject<FilterOption>) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
    resultSubject.complete();
  }
}
