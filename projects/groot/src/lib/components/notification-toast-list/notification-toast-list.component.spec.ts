import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationToastListComponent} from './notification-toast-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationToastService} from '../../services/notification-toast.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('NotificationToastListComponent', () => {
  let service: NotificationToastService;
  let component: NotificationToastListComponent;
  let fixture: ComponentFixture<NotificationToastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [NotificationToastService],
      declarations: [NotificationToastListComponent]
    }).compileComponents();
    service = TestBed.get(NotificationToastService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationToastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have no toasts at creation', () => {
    expect(component).toBeTruthy();

    const toasts = fixture.debugElement.nativeElement.querySelector('.toaster-toast');
    expect(toasts).toBeNull();
  });

  it('should add a toast when the service is invoked', () => {
    service.addToast({label: 'hello'});
    fixture.detectChanges();

    const firstToast = fixture.debugElement.nativeElement.querySelector('.toaster-toast');
    expect(firstToast).not.toBeNull();
    const text = firstToast.querySelector('p');
    expect(text).not.toBeNull();
    expect(text.innerHTML).toBe('hello');
  });
});
