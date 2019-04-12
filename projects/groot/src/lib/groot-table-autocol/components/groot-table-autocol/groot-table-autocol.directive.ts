import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({selector: '[grootTableAutocolActions]'})
export class GrootTableAutocolActionsDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({selector: '[grootTableAutocolTemplateForColumn]'})
export class GrootTableAutocolTemplateForColumnDirective {
  @Input('grootTableAutocolTemplateForColumn') columnKey: string;

  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({selector: '[grootTableAutocolTitleRightArea]'})
export class GrootTableTitleAutocolRightAreaDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
