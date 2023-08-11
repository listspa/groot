import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {TablePaginationComponent} from './table-pagination.component';
import {TranslateModule} from '@ngx-translate/core';

describe('ListPaginationComponent', () => {
  let component: TablePaginationComponent;
  let fixture: ComponentFixture<TablePaginationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TablePaginationComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should work correctly with one page of data', () => {
    component.totalItems = 5;
    fixture.detectChanges();
    expect(component._numPages).toBe(1);
    expect(component._pageNum).toBe(0);
  });

  it('should work correctly with three pages of data', () => {
    let numPageChanges = 0;
    component.pageNumChange.subscribe(() => ++numPageChanges);

    component.totalItems = 25;
    fixture.detectChanges();
    expect(component._numPages).toBe(3);
    expect(component._pageNum).toBe(0);

    // Check disabled classes
    const prevDisabled = fixture.debugElement.nativeElement.querySelector('.paginator-prev.disabled');
    expect(prevDisabled).not.toBeNull();
    const nextDisabled = fixture.debugElement.nativeElement.querySelector('.paginator-next.disabled');
    expect(nextDisabled).toBeNull();

    // Navigate
    const lastLink = fixture.debugElement.nativeElement.querySelector('.paginator-first-last.float-end a');
    lastLink.click();
    expect(component._pageNum).toBe(2);
    expect(numPageChanges).toBe(1);

    const prevLink = fixture.debugElement.nativeElement.querySelector('.paginator-prev');
    prevLink.click();
    expect(component._pageNum).toBe(1);
    expect(numPageChanges).toBe(2);

    const nextLink = fixture.debugElement.nativeElement.querySelector('.paginator-next');
    nextLink.click();
    expect(component._pageNum).toBe(2);
    expect(numPageChanges).toBe(3);

    const firstLink = fixture.debugElement.nativeElement.querySelector('.paginator-first-last.float-start a');
    firstLink.click();
    expect(component._pageNum).toBe(0);
    expect(numPageChanges).toBe(4);

    prevLink.click();
    expect(component._pageNum).toBe(0);
    expect(numPageChanges).toBe(4);
  });

  it('should allow to set externally page num', () => {
    component.totalItems = 25;
    component.loadedPageNum = 1;
    fixture.detectChanges();

    expect(component._numPages).toBe(3);
    expect(component._pageNum).toBe(1);
  });
});
