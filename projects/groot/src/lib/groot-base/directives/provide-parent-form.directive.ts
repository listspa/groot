// See https://stackoverflow.com/questions/45304810/angular-form-validation-on-child-components

import {ControlContainer, NgForm} from '@angular/forms';
import {Directive} from '@angular/core';

export function provideNgForm(form: NgForm) {
  return form;
}

@Directive({
  selector: '[groot-provide-parent-form]',
  providers: [
    {
      provide: ControlContainer,
      useFactory: provideNgForm,
      deps: [NgForm]
    }
  ]
})
export class GrootProvideParentForm {
}
