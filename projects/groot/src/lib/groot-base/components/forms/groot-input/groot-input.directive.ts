import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[grootInputIconLeft]'})
export class GrootInputIconLeftDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({selector: '[grootInputIconRight]'})
export class GrootInputIconRightDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
