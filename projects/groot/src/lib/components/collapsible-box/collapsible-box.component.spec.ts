import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CollapsibleBoxComponent} from './collapsible-box.component';
import {TranslateModule} from '@ngx-translate/core';

describe('CollapsibleBoxComponent', () => {
  let component: CollapsibleBoxComponent;
  let fixture: ComponentFixture<CollapsibleBoxComponent>;
  let content: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleBoxComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    content = fixture.debugElement.nativeElement.querySelector('.content');
  });

  it('should create and display content', () => {
    expect(content.hidden).toBeFalsy();
  });

  it('should hide content when clicked', () => {
    fixture.debugElement.nativeElement.querySelector('.box-icons').click();
    fixture.detectChanges();

    expect(content.hidden).toBeTruthy();
  });

  it('should reset content when clicked twice', () => {
    fixture.debugElement.nativeElement.querySelector('.box-icons').click();
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('.box-icons').click();
    fixture.detectChanges();

    expect(content.hidden).toBeFalsy();
  });

  it('should emit events when clicked', () => {
    let lastValue = null;
    component.changeDisplay.subscribe(val => lastValue = val);

    fixture.debugElement.nativeElement.querySelector('.box-icons').click();
    expect(lastValue).toBe(false);

    fixture.debugElement.nativeElement.querySelector('.box-icons').click();
    expect(lastValue).toBe(true);
  });
});
