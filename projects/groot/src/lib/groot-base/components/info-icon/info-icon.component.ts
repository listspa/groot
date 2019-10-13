import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'groot-info-icon',
  templateUrl: './info-icon.component.html',
})
export class InfoIconComponent {
  @Input() popoverTemplate: TemplateRef<any>;
}
