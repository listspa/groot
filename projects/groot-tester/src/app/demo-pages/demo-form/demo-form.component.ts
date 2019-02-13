import {Component} from '@angular/core';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent {
  form = {
    name: '',
    lastName: ''
  };
  public customCheck0 = true;
  public customCheck1 = false;
  public selectedRadio = 'first-radio';

}
