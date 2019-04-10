import {Component} from '@angular/core';

@Component({
  selector: 'app-demo-small-components',
  templateUrl: './demo-small-components.component.html',
})
export class DemoSmallComponentsComponent {
  onClickActionProva() {
    alert('test test');
  }
}
