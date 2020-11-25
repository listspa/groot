import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';

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
    file: null,
    files: [],
  };
  public currencies = ['EUR', 'USD', 'JPY', 'CNY', 'RUB'];

  constructor() {
  }

  @ViewChild('ngForm') ngForm: NgForm;

  name2 = new FormControl('');
  name3 = new FormControl('');
  description3 = new FormControl('');
  description4 = new FormControl('');

  ngOnInit(): void {
    console.log(this.ngForm);
  }
}
