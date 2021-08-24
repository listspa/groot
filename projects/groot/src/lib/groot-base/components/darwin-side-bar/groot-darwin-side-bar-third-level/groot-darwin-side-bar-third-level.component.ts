import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {DarwinSideBarThirdLevel} from '../../../model/darwin-sidebar.model';

@Component({
  selector: 'groot-darwin-side-bar-third-level',
  templateUrl: './groot-darwin-side-bar-third-level.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GrootDarwinSideBarThirdLevelComponent {
  @Output() actionTriggered = new EventEmitter<DarwinSideBarThirdLevel>();

  @Input() forceReloadStates: boolean;
  @Input() thirdLevel: DarwinSideBarThirdLevel;
}
