import {Component, OnInit} from '@angular/core';
import {NotificationToastService, Toast} from '../../services/notification-toast.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'groot-notification-toast-list',
  templateUrl: './notification-toast-list.component.html',
  styleUrls: ['./notification-toast-list.component.scss'],
  animations: [
    // Stolen from https://medium.com/google-developer-experts/angular-applying-motion-principles-to-a-list-d5cdd35c899e
    trigger('items', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
          }))
      ])
    ])
  ]
})
export class NotificationToastListComponent implements OnInit {
  displayedToast: Toast[] = [];

  constructor(private notificationToastService: NotificationToastService) {
  }

  ngOnInit() {
    this.notificationToastService.toastAdded
      .subscribe(newToast => this.displayedToast.unshift(newToast));
    this.notificationToastService.toastRemoved
      .subscribe(oldToast => {
        const idx = this.displayedToast.indexOf(oldToast);
        if (idx !== -1) {
          this.displayedToast.splice(idx, 1);
        }
      });
  }

  clickOnToast(toast: Toast): void {
    toast.clickCallback.emit(toast);
  }
}
