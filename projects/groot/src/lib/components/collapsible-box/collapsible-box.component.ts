import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'groot-collapsible-box',
  templateUrl: './collapsible-box.component.html',
  animations: [
    trigger('toggle', [
      state('collapsed', style({opacity: 0.0, height: 0, display: 'none'})),
      state('expanded', style({opacity: 1.0, height: '*'})),
      transition('collapsed => expanded', [
        style({opacity: 0.0, height: 0}),
        animate('0.15s ease-in-out', style({opacity: 1.0, height: '*'}))
      ]),
      transition('expanded => collapsed', [
        style({opacity: 1.0, height: '*'}),
        animate('0.15s ease-in-out', style({opacity: 0.0, height: 0}))
      ])
    ])
  ],
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
