import {TestBed} from '@angular/core/testing';

import {NotificationToastService, Toast} from './notification-toast.service';
import {TranslateModule} from '@ngx-translate/core';

describe('NotificationToastService', () => {
  let service: NotificationToastService;
  const toasts: Toast[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [NotificationToastService]
    });
    service = TestBed.get(NotificationToastService);
  });

  it('should create a toast', () => {
    service.toastAdded.subscribe(newToast => toasts.push(newToast));

    service.addToast({label: 'test'});
    expect(toasts.length).toBe(1);
    expect(toasts[0].label).toBe('test');
    expect(toasts[0].title).toBe('');
    expect(toasts[0].icon).toEqual([]);
  });
});
