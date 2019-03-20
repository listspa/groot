import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[grootTableHeader]'})
export class GrootTableHeaderDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({selector: '[grootTableBody]'})
export class GrootTableBodyDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
