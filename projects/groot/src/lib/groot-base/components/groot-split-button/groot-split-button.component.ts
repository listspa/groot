import {Component, Input} from '@angular/core';
import {ClassesType} from '../../../model/classes-type.model';

@Component({
  selector: 'groot-split-button',
  templateUrl: './groot-split-button.component.html',
})
export class GrootSplitButtonComponent {
  @Input() classes: ClassesType = 'btn-primary';
  @Input() icon: string | null = null;
  @Input() label: string;
  @Input() disabled = false;
}
