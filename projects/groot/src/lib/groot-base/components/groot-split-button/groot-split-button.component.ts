import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-split-button',
  templateUrl: './groot-split-button.component.html',
})
export class GrootSplitButtonComponent {
  @Input() classes: string | string[] = 'btn-primary';
  @Input() icon: string | null = null;
  @Input() label: string;
  @Input() disabled = false;
}
