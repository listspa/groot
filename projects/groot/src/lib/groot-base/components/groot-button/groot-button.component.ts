import {Component, Input} from '@angular/core';
import {ClassesType} from '../../../model/classes-type.model';

@Component({
  selector: 'groot-button',
  templateUrl: './groot-button.component.html'
})
export class GrootButtonComponent {
  @Input() classes: ClassesType = 'btn-primary';
  @Input() icon: string | null = null;
  @Input() label: string;
  @Input() disabled = false;
}
