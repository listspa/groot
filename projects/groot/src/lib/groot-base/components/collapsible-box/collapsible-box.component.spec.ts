import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CollapsibleBoxComponent} from './collapsible-box.component';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CollapsibleBoxComponent', () => {
  let component: CollapsibleBoxComponent;
  let fixture: ComponentFixture<CollapsibleBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsibleBoxComponent],
      imports: [
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display content', () => {
    expect(component.open).toBe(true);
  });

  it('should hide content when clicked', () => {
    fixture.debugElement.nativeElement.querySelector('.card-header').click();
    fixture.detectChanges();

    expect(component.open).toBe(false);
  });

  it('should reset content when clicked twice', () => {
    fixture.debugElement.nativeElement.querySelector('.card-header').click();
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('.card-header').click();
    fixture.detectChanges();

    expect(component.open).toBe(true);
  });

  it('should emit events when clicked', () => {
    let lastValue = null;
    component.changeDisplay.subscribe(val => lastValue = val);

    fixture.debugElement.nativeElement.querySelector('.card-header').click();
    expect(lastValue).toBe(false);

    fixture.debugElement.nativeElement.querySelector('.card-header').click();
    expect(lastValue).toBe(true);
  });
});
