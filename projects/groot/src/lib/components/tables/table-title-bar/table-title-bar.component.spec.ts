import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableTitleBarComponent} from './table-title-bar.component';
import {DownloadButtonComponent} from '../../download-button/download-button.component';
import {TranslateModule} from '@ngx-translate/core';

describe('TableTitleBarComponent', () => {
  const searchResults = {
    pageLen: 10,
    pageNum: 1,
    totalNumRecords: 29,
    records: []
  };
  let component: TableTitleBarComponent;
  let fixture: ComponentFixture<TableTitleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableTitleBarComponent, DownloadButtonComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when no search results are present', () => {
    it('should display the label', () => {
      const text = fixture.debugElement.nativeElement.querySelector('h2').innerText;
      expect(text).toBe('common.searchResults');
    });

    it('should not display the page info', () => {
      const small = fixture.debugElement.nativeElement.querySelector('small');
      expect(small).toBeNull();
    });
  });

  describe('when search results are given ', () => {
    beforeEach(() => {
      component.searchResults = searchResults;
      fixture.detectChanges();
    });

    it('should display the pagination information', () => {
      const text = fixture.debugElement.nativeElement.querySelector('small').innerText;
      expect(text).toBe('common.paginationRowsInfo');
      expect(component.pageInfo.startRowIdx).toBe(11);
      expect(component.pageInfo.endRowIdx).toBe(20);
      expect(component.pageInfo.totalItems).toBe(29);
    });
  });

  it('when no download excel url is given should not display the download excel button', () => {
    const button = fixture.debugElement.nativeElement.querySelector('groot-download-button');
    expect(button).toBeNull();
  });

  describe('when download excel url is given', () => {
    describe('with hard coded string', () => {
      it('should not display the download excel button if there are no data', () => {
        component.downloadExcelUrl = 'foo';
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('groot-download-button');
        expect(button).toBeNull();
      });

      it('should display the download excel button when there are data', () => {
        component.downloadExcelUrl = 'foo';
        component.searchResults = searchResults;
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('groot-download-button');
        expect(button).not.toBeNull();
      });
    });

    describe('with url provider', () => {
      it('should not display the download excel button if there are no data', () => {
        component.downloadExcelUrlProvider = () => 'foo';
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('groot-download-button');
        expect(button).toBeNull();
      });

      it('should display the download excel button when there are data', () => {
        component.downloadExcelUrlProvider = () => 'foo';
        component.searchResults = searchResults;
        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('groot-download-button');
        expect(button).not.toBeNull();
      });
    });
  });
});
