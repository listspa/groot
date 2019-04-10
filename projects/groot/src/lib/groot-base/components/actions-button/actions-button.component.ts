import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-actions-button',
  templateUrl: './actions-button.component.html'
})
export class ActionsButtonComponent {
  @Input() placement: 'top' | 'bottom' | 'right' | 'left' | 'auto' = 'right';
  @Input() popoverTitle: string | null;

  hover: boolean;
}
