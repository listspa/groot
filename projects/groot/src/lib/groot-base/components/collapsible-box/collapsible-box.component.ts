import {Component, EventEmitter, Input, Output} from '@angular/core';
import {dropDownOnCreateAnimation, emptyEnterAnimation} from '../../utils/animations-utils';
import {ClassesType} from '../../model/classes-type.model';

@Component({
  selector: 'groot-collapsible-box',
  templateUrl: './collapsible-box.component.html',
  animations: [dropDownOnCreateAnimation, emptyEnterAnimation],
})
export class CollapsibleBoxComponent {
  @Input() label: string;
  @Input() open = true;
  @Input() headerClasses: ClassesType = null;
  @Input() bodyClasses: ClassesType = 'card-body-box-bg';
  @Output() changeDisplay = new EventEmitter<boolean>();

  public toggle(): void {
    this.open = !this.open;
    this.changeDisplay.emit(this.open);
  }
}
