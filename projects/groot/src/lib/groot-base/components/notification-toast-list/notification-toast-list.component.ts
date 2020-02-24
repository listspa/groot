import {Component, OnInit} from '@angular/core';
import {NotificationToastService, Toast} from '../../services/notification-toast.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {isIe11OrEdge} from '../../utils/browser-utils';

// Note: we cannot simply use :leave trigger, because it doesn't work correctly under IE11 or Edge.
// Under those browsers, we simply disable the leave animation.
// See https://blog.angularindepth.com/total-guide-to-dynamic-angular-animations-that-can-be-toggled-at-runtime-be5bb6778a0a
// and https://github.com/angular/angular/issues/24923
export function mayShowLeaveAnimation(fromState, toState) {
  const isLeave = fromState === null && toState === 'void';
  return !isIe11OrEdge() && isLeave;
}

@Component({
  selector: 'groot-notification-toast-list',
  templateUrl: './notification-toast-list.component.html',
  animations: [
    // Stolen from https://medium.com/google-developer-experts/angular-applying-motion-principles-to-a-list-d5cdd35c899e
    trigger('items', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'scale(1)', opacity: 1}))  // final
      ]),
      transition(mayShowLeaveAnimation, [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
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
