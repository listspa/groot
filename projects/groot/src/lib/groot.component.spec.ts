import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrootComponent } from './groot.component';

describe('GrootComponent', () => {
  let component: GrootComponent;
  let fixture: ComponentFixture<GrootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
