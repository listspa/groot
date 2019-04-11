import {Component, HostListener, Input, TemplateRef, ViewChild} from '@angular/core';
import {PopoverDirective} from 'ngx-bootstrap';

@Component({
  selector: 'groot-actions-button',
  templateUrl: './actions-button.component.html'
})
export class ActionsButtonComponent {
  @Input() placement: 'top' | 'bottom' | 'right' | 'left' | 'auto' = 'right';
  @Input() popoverTitle: string | null;
  @Input() popoverTemplate: TemplateRef<any>;
  @Input() popoverContext: any;

  hover: boolean;
  @ViewChild('popover') popover: PopoverDirective;

  @HostListener('click', ['$event'])
  onClick($event) {
    this.popover.hide();
    $event.stopPropagation();
  }
}
