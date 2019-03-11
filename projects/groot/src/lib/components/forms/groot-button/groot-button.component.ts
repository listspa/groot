import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-button',
  templateUrl: './groot-button.component.html'
})
export class GrootButtonComponent {
  @Input() classes: string | string[] = 'btn-primary';
  @Input() icon: string | null = null;
  @Input() label: string;
  @Input() disabled = false;
}
