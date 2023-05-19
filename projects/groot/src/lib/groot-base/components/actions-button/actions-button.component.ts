import {Component, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'groot-actions-button',
  templateUrl: './actions-button.component.html'
})
export class ActionsButtonComponent implements OnDestroy {
  @Output() open = new EventEmitter<boolean>();

  @Input() placement: 'top' | 'bottom' | 'right' | 'left' | 'auto' = 'right';
  @Input() popoverTitle: string | null;
  @Input() popoverTemplate: TemplateRef<any>;
  @Input() popoverContext: any;
  @Input() additionalPopoverContainerClass: string | null = null;
  @Input() insideTable = false;
  @Input() hamburger = false;

  @HostBinding('class.groot-actions-button-hover') hover: boolean;
  @HostBinding('class.groot-actions-button-open') isOpen: boolean;

  shown(): void {
    this.isOpen = true;
    this.open.next(true);
  }

  hidden(): void {
    this.isOpen = false;
    this.open.next(false);
  }

  ngOnDestroy(): void {
    this.open.complete();
  }

  get computedPopoverContainerClass(): string {
    const base = 'groot-actions-button-popover popover-dark';
    return this.additionalPopoverContainerClass ? `${base} ${this.additionalPopoverContainerClass}` : base;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
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
