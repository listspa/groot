import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {TableColumn} from '../../model/table-columns.model';
import {PopoverFilterComponent} from './popover-filter/popover-filter.component';
import {fromEvent, Observable, Subject, Subscription} from 'rxjs';
import {finalize, skip} from 'rxjs/operators';

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

  showPopover(column: TableColumn, event: MouseEvent, domain: Observable<string[]>, currentValues: string[] | null)
    : Observable<string[] | null> {
    const resultSubject = new Subject<string[]>();

    const componentRef = this.createComponent(event);
    const domainSub = this.fillInputs(componentRef, column, resultSubject, currentValues, domain);

    // this.closeComponentOnClickOutside(componentRef, domainSub);

    return resultSubject.pipe(
      finalize(() => this.closeComponent(componentRef, domainSub)));
  }

  // See https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  private createComponent(event: MouseEvent): ComponentRef<PopoverFilterComponent> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(PopoverFilterComponent)
      .create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = this.appendDomElementToBody(componentRef);
    this.position(domElem, event);
    return componentRef;
  }

  private appendDomElementToBody(componentRef): HTMLElement {
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return domElem;
  }

  private position(domElem, event: MouseEvent) {
    const target: any = event.target;
    const th = target.closest('th');
    console.log(th);

    // TODO: at this point the domElem.offsetWidth is not correct, so we hard code the width
    const popoverW = PopoverFilterService.convertRemToPixels(28.5);
    let left = (th.offsetLeft + th.offsetWidth / 2 - popoverW / 2);
    if (left < 0) {
      left = 5;
    }
    if (left + popoverW > window.innerWidth) {
      left = window.innerWidth - popoverW - 5;
    }

    domElem.style.left = left + 'px';
    domElem.style.top = (th.offsetTop + th.offsetHeight - 10) + 'px';
  }

  // tslint:disable-next-line:member-ordering
  private static convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  private fillInputs(componentRef: ComponentRef<PopoverFilterComponent>,
                     column: TableColumn,
                     resultSubject,
                     currentValues: string[] | null,
                     domain: Observable<string[]>)
    : Subscription {
    const popoverFilterComponent = componentRef.instance;
    popoverFilterComponent.column = column;
    popoverFilterComponent.results = resultSubject;
    popoverFilterComponent.selectedValues = currentValues ? [...currentValues] : [];
    return domain.subscribe(d => popoverFilterComponent.domain = d);
  }

  private closeComponentOnClickOutside(componentRef: ComponentRef<any>, domainSub: Subscription) {
    fromEvent(window.document.body, 'click')
      .pipe(skip(1))
      .subscribe(() => this.closeComponent(componentRef, domainSub));
  }

  private closeComponent(componentRef: ComponentRef<any>, domainSub: Subscription) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();

    domainSub.unsubscribe();
  }
}
