import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {YesNoCheckComponent} from './yes-no-check.component';
import {TranslateModule} from '@ngx-translate/core';

describe('YesNoCheckComponent', () => {
  let component: YesNoCheckComponent;
  let fixture: ComponentFixture<YesNoCheckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [YesNoCheckComponent],
      imports: [
        TranslateModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not show anything without a value set', () => {
    expect(fixture.debugElement.nativeElement.querySelector('i')).toBeNull();
  });

  it('should show the yes symbol', () => {
    component.value = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('i.fa-check')).not.toBeNull();
  });

  it('should show the no symbol', () => {
    component.value = false;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('i.fa-xmark')).not.toBeNull();
  });
});
