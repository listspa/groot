import {Component, EventEmitter, HostBinding, Input, OnDestroy, Output, TemplateRef} from '@angular/core';

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
}
