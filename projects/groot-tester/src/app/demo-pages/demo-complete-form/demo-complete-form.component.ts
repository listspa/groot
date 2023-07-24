import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl, NgForm, Validators} from '@angular/forms';
import {validateForm} from 'projects/groot/src/lib/groot-base/utils/form-utils';
import {NotificationToastService, ToastStyle} from '../../../../../groot/src/lib/groot-base/services/notification-toast.service';

@Component({
  selector: 'app-demo-complete-form',
  templateUrl: './demo-complete-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoCompleteFormComponent implements OnInit {
  public form = {
    dateTime: new Date(),
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

  constructor(private notificationToastService: NotificationToastService) {
  }

  @ViewChild('ngForm') ngForm: NgForm;

  name2 = new UntypedFormControl('');
  name3 = new UntypedFormControl('');
  description3 = new UntypedFormControl('');
  description4 = new UntypedFormControl('');
  dateTime = new UntypedFormControl(new Date(), [Validators.required]);

  ngOnInit(): void {
    console.log(this.ngForm);

    this.dateTime.valueChanges.subscribe(v => console.log('date time = ', v));
  }

  resetDateTime() {
    this.dateTime.reset();
  }

  dateTimeChanged(event: Date): void {
    console.log('Changed date time = ', event);
  }

  validateForm() {
    validateForm(this.ngForm);
    if (!this.ngForm.valid) {
      this.notificationToastService.addToast({
        title: 'Validation failed',
        label: 'Some fields are not valid',
        style: ToastStyle.DANGER,
      });
      return;
    }
    console.log('Form valido, salvo');
  }
}
