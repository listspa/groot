import {Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'groot-accordion-indicator',
  templateUrl: './groot-accordion-indicator.component.html',
})
export class GrootAccordionIndicatorComponent {
  @Input() row: any;
  @Input() accordionVisibleProperty = '$accordionVisible';

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    this.row[this.accordionVisibleProperty] = !this.row[this.accordionVisibleProperty];
    $event.stopPropagation();
  }
}
