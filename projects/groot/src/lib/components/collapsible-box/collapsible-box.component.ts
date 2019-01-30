import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'groot-collapsible-box',
  templateUrl: './collapsible-box.component.html',
  styleUrls: ['./collapsible-box.component.scss']
})
export class CollapsibleBoxComponent {
  @Input() label: string;
  @Input() open = true;
  @Output() changeDisplay = new EventEmitter<boolean>();

  public toggle(): void {
    this.open = !this.open;
    this.changeDisplay.emit(this.open);
  }
}
