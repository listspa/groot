import {Component, EventEmitter, Input, Output} from '@angular/core';
import {dropDownAnimation} from '../../utils/animations-utils';

@Component({
  selector: 'groot-collapsible-box',
  templateUrl: './collapsible-box.component.html',
  animations: [dropDownAnimation],
})
export class CollapsibleBoxComponent {
  @Input() label: string;
  private _open = true;
  @Output() changeDisplay = new EventEmitter<boolean>();
  public state: 'collapsed' | 'expanded' = 'expanded';

  public get open(): boolean {
    return this._open;
  }

  @Input()
  public set open(value: boolean) {
    this.state = value ? 'expanded' : 'collapsed';
    this._open = value;
  }

  public toggle(): void {
    this.open = !this.open;
    this.changeDisplay.emit(this._open);
  }
}
