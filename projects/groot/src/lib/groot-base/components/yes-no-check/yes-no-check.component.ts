import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-yes-no-check',
  templateUrl: './yes-no-check.component.html'
})
export class YesNoCheckComponent {
  @Input() value: boolean;
}
