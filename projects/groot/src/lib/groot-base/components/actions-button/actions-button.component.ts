import {Component, HostBinding, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'groot-actions-button',
  templateUrl: './actions-button.component.html'
})
export class ActionsButtonComponent {
  @Input() placement: 'top' | 'bottom' | 'right' | 'left' | 'auto' = 'right';
  @Input() popoverTitle: string | null;
  @Input() popoverTemplate: TemplateRef<any>;
  @Input() popoverContext: any;
  @Input() insideTable = false;
  @Input() hamburger = false;

  @HostBinding('class.groot-actions-button-hover') hover: boolean;
  @HostBinding('class.groot-actions-button-open') open: boolean;
}
