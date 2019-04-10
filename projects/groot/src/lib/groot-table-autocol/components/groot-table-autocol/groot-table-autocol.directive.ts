import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[grootTableAutocolActions]'})
export class GrootTableAutocolActionsDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
