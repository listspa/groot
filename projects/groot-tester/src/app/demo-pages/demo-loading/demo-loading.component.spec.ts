import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLoadingComponent } from './demo-loading.component';

describe('DemoLoadingComponent', () => {
  let component: DemoLoadingComponent;
  let fixture: ComponentFixture<DemoLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
