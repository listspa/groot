import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'groot-actions-button-entry',
  templateUrl: './actions-button-entry.component.html'
})
export class ActionsButtonEntryComponent {
  @Input() label: string;
  @Input() icon: string | string[] | null = null;
  @HostBinding('class.disabled') @Input() disabled: boolean = false;
  @Output() actionTriggered = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.actionTriggered.next();

    // When clicking an action, we want to close the popover (example use case: we open a modal
    // window at the click. The popover needs to disappear, rather than be on top of the modal).
    // To do this, we launch a new click event on the body. The popover is marked in
    // `ActionsButtonComponent` as `outsideClick=true`, which means the popover will handle it
    // and close itself. We also need to create a new event to start dispatching.
    // See also https://stackoverflow.com/questions/11974262/how-to-clone-or-re-dispatch-dom-events
    event.stopPropagation();
    const newEvent = new MouseEvent(event.type, event);
    window.document.body.dispatchEvent(newEvent);
  }
}
