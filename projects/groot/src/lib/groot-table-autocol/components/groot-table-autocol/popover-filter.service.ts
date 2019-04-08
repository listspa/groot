import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {TableColumn} from '../../model/table-columns.model';
import {PopoverFilterComponent} from './popover-filter/popover-filter.component';
import {fromEvent, Observable, Subject, Subscription} from 'rxjs';
import {finalize, skip} from 'rxjs/operators';

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

    const {domElem, componentRef} = this.createComponent();
    const popoverFilterComponent = componentRef.instance;
    popoverFilterComponent.column = column;
    popoverFilterComponent.results = resultSubject;
    popoverFilterComponent.selectedValues = currentValues ? [...currentValues] : [];

    const domainSub = domain.subscribe(d => popoverFilterComponent.domain = d);

    this.position(domElem, event);

    // this.closeComponentOnClickOutside(componentRef, domainSub);

    return resultSubject.pipe(
      finalize(() => this.closeComponent(componentRef, domainSub)));
  }

  // See https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  private createComponent() {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(PopoverFilterComponent)
      .create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = this.appendDomElementToBody(componentRef);
    return {domElem, componentRef};
  }

  private appendDomElementToBody(componentRef) {
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return domElem;
  }

  private position(domElem, event: MouseEvent) {
    domElem.style.left = event.pageX + 'px';
    domElem.style.top = (event.pageY + 10) + 'px';
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
