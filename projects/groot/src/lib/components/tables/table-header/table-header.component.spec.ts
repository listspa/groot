import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableHeaderComponent} from './table-header.component';
import {Sorting} from '../../../nbpu.interfaces';

describe('SortColumnButtonComponent', () => {
  let component: TableHeaderComponent;
  let fixture: ComponentFixture<TableHeaderComponent>;
  let sorting: Sorting;
  let buttonsArea: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    sorting = {column: 'A', reverse: false};
    fixture = TestBed.createComponent(TableHeaderComponent);
    component = fixture.componentInstance;
    component.columnName = 'A';
    component.sortChange.subscribe(newSort => sorting = newSort);
    component.sort = sorting;
    fixture.detectChanges();
    buttonsArea = fixture.debugElement.nativeElement.querySelector('.buttons');
  });

  it('should change sorting but not column name if it is the same', () => {
    const activeLink = fixture.debugElement.nativeElement.querySelector('.buttons .active');
    expect(activeLink).not.toBeNull();

    buttonsArea.click();
    expect(sorting.column).toEqual('A');
    expect(sorting.reverse).toEqual(true);
  });

  it('should work on click', () => {
    component.columnName = 'B';
    fixture.detectChanges();

    buttonsArea.click();
    expect(sorting.column).toEqual('B');
    expect(sorting.reverse).toEqual(false);

    buttonsArea.click();
    expect(sorting.column).toEqual('B');
    expect(sorting.reverse).toEqual(true);
  });

  it('should respond correctly when sorting is changed externally', () => {
    component.sort = {column: 'C', reverse: false};
    fixture.detectChanges();

    const activeLink = fixture.debugElement.nativeElement.querySelector('.buttons .text-primary');
    expect(activeLink).toBeNull();
  });
});
