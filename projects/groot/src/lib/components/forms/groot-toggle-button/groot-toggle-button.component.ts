import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-toggle-button',
  templateUrl: './groot-toggle-button.component.html'
})
export class GrootToggleButtonComponent {
  @Input() label: string;
  @Input() disabled = false;
  value = true;

  toggleStatus() {
    if (this.disabled) {
      return;
    }
    this.value = !this.value;
  }
}
