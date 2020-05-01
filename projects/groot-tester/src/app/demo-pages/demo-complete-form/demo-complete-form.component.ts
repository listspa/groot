import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-demo-complete-form',
  templateUrl: './demo-complete-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoCompleteFormComponent implements OnInit {
  public form = {
    name: 'axa',
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
    toggler: true,
    description: '',
    file: new File([], 'prova.txt'),
  };
  public currencies = ['EUR', 'USD', 'JPY', 'CNY', 'RUB'];

  constructor() {
  }

  @ViewChild("ngForm") ngForm: NgForm;

  ngOnInit(): void {
    console.log(this.ngForm)
  }
}
