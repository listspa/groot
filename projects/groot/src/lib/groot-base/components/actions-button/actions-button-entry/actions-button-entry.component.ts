import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'groot-actions-button-entry',
  templateUrl: './actions-button-entry.component.html'
})
export class ActionsButtonEntryComponent {
  @Input() label: string;
  @Input() icon: string | string[] | null = null;
  @Output() actionTriggered = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    this.actionTriggered.next();
    $event.stopPropagation();
  }
}
