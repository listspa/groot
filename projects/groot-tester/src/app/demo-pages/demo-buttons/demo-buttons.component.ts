import {Component} from '@angular/core';
import {BOOTSTRAP_STYLES} from '../../constants';

@Component({
  selector: 'app-demo-buttons',
  templateUrl: './demo-buttons.component.html'
})
export class DemoButtonsComponent {
  styles = BOOTSTRAP_STYLES;

  clicked() {
    console.log('clicked!');
  }
}
