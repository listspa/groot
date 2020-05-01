import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-demo-complete-form',
  templateUrl: './demo-complete-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoCompleteFormComponent implements OnInit {
  public form = {
    date: new Date(),
    name: 'axa',
    toggler: true,
    todayIs: 'good',
    currency: null,
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
