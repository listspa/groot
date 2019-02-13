import {Component} from '@angular/core';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent {
  form = {
    name: '',
    lastName: '',
    currency: null,
    selectedCurrencies: [],
    selectedAlbumId: null,
    selectedRadio: 'first-radio',
    customCheck0: true,
    customCheck1: false
  };

  public currencies = ['EUR', 'USD', 'CHF'];
  public albums = [
    {
      id: 1,
      name: 'Dark side of the moon'
    },
    {
      id: 2,
      name: 'Who\'s next'
    },
    {
      id: 3,
      name: 'Tommy'
    }
  ];
}
