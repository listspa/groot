import {Component} from '@angular/core';
import {NotificationToastService, ToastStyle} from '../../../../../groot/src/lib/groot-base/services/notification-toast.service';

@Component({
  selector: 'app-demo-toaster',
  templateUrl: './demo-toaster.component.html'
})
export class DemoToasterComponent {
  constructor(private toastService: NotificationToastService) {
  }

  showToasts(): void {
    this.toastService.addToast({
      label: 'click on me to send me away',
      additionalDetails: '(other details)',
      autoRemove: false
    }).subscribe(toast => {
      console.log('going away!');
      toast.doRemove();
    });

    setTimeout(() =>
      this.toastService.addToast({
        label: 'common.search',
        title: 'title',
        icon: ['fa', 'fa-info']
      }).subscribe(() => console.log('info clicked')), 1000);

    setTimeout(() =>
      this.toastService.addToast({
        label: 'common.search',
        title: 'title',
        translateLabel: false,
        style: ToastStyle.SUCCESS
      }).subscribe(() => console.log('success clicked')), 2200);

    setTimeout(() =>
      this.toastService.addToast({
        label: 'warning',
        style: ToastStyle.WARNING,
        icon: 'fa fa-calendar'
      }).subscribe(() => console.log('warning clicked')), 3500);

    setTimeout(() =>
      this.toastService.addToast({
        label: 'err',
        style: ToastStyle.DANGER,
        clickable: false
      }).subscribe(() => console.log('error clicked')), 4800);
  }
}
