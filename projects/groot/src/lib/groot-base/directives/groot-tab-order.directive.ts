import {Directive, Input, OnChanges} from '@angular/core';
import {TabDirective} from 'ngx-bootstrap/tabs';

/**
 * ngx-bootstraps' tabs do not respect order when using *ngIf on some of them.
 * This directive allows you to specify a fixed order for tabs.
 *
 * See https://github.com/valor-software/ngx-bootstrap/issues/823
 */
@Directive({
  selector: '[grootTabOrder]'
})
export class GrootTabOrderDirective implements OnChanges {

  @Input('grootTabOrder') tabOrder = 0;

  constructor(private tab: TabDirective) {
  }

  ngOnChanges() {
    (this.tab as any).__tabOrder = +this.tabOrder;
    this.tab.tabset.tabs.sort((a: any, b: any) => a.__tabOrder - b.__tabOrder);
  }

}
