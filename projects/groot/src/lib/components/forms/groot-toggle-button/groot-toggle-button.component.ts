import {Component, Input} from '@angular/core';

@Component({
  selector: 'groot-toggle-button',
  templateUrl: './groot-toggle-button.component.html'
})
export class GrootToggleButtonComponent {
  @Input() label: string;
  value = true;

  toggleStatus() {
    this.value = !this.value;
  }
}
