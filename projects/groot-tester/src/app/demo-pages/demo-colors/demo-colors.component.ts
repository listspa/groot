import {Component} from '@angular/core';
import {BOOTSTRAP_STYLES} from '../../constants';

@Component({
  selector: 'app-demo-colors',
  templateUrl: './demo-colors.component.html'
})
export class DemoColorsComponent {
  styles = BOOTSTRAP_STYLES;
}
