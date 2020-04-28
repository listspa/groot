import {Component} from '@angular/core';

@Component({
  selector: 'app-demo-complete-form',
  templateUrl: './demo-complete-form.component.html'
})
export class DemoCompleteFormComponent {
  public form = {
    name: '',
    lastName: '',
    currency: null,
    selectedCurrencies: [],
    selectedManyCurrencies: [],
    selectedManyCurrenciesById: [],
    selectedAlbumId: null,
    selectedRadio: 'first-radio',
    customCheck0: true,
    customCheck1: false,
    date: new Date(),
    toggler: false,
    description: '',
    file: new File([], 'prova.txt'),
  };
  public currencies = ['EUR', 'USD', 'JPY', 'CNY', 'RUB'];

  constructor() {
  }

}
