import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-darwin-breadcrumb-go-back',
  templateUrl: './groot-darwin-breadcrumbs-go-back.component.html',
})
export class GrootDarwinBreadcrumbsGoBackComponent {
  @Input() label: string;
  @Input() labelArgs: any;
  @Input() action: any | any[];
}
