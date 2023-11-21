import {Component, Input} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'groot-darwin-breadcrumb-go-back',
  templateUrl: './groot-darwin-breadcrumbs-go-back.component.html',
})
export class GrootDarwinBreadcrumbsGoBackComponent {
  @Input() label: string;
  @Input() labelArgs: any;
  @Input() action: any | any[] = null;

  constructor(private location: Location) {}

  browsersGoBack(): void {
    this.location.back();
  }
}
