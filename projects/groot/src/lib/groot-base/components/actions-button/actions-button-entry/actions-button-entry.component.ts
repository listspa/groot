import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-actions-button-entry',
  templateUrl: './actions-button-entry.component.html'
})
export class ActionsButtonEntryComponent {
  @Input() label: string;
  @Input() icon: string | string[] | null = null;
}
