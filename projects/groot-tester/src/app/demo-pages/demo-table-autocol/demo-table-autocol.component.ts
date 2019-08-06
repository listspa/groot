import {Component, OnInit} from '@angular/core';
import {SelectedColumns, TableColumns} from '../../../../../groot/src/lib/groot-table-autocol/model/table-columns.model';
import {isLoadingFailed, LoadingFailed} from '../../../../../groot/src/lib/groot-base/components/tables/groot-table/groot-table.component';
import {Deal, DealsService} from './deals-service';
import {FilterPaginationOptions, PaginatedResponse} from '../../../../../groot/src/lib/groot-base/utils/pagination.model';
import {PopoverDataRequest, toSearchColumnValuesRequest} from '../../../../../groot/src/lib/groot-table-autocol/model/popover-filter.model';
// tslint:disable-next-line
import {ColumnAndWidth} from '../../../../../groot/src/lib/groot-table-autocol/components/groot-table-autocol/groot-table-autocol.component';
import {DemoTableAutocolConfigService} from './demo-table-autocol-config-service';

@Component({
  selector: 'app-demo-table-autocol',
  templateUrl: './demo-table-autocol.component.html'
})
export class DemoTableAutocolComponent implements OnInit {
  searchResultsData: PaginatedResponse<Deal> | LoadingFailed;
  lastRefreshTimestamp: Date;
  availableColumns: TableColumns;
  selectedColumns: TableColumns;
  accordionColumns: TableColumns;

  constructor(private dealsService: DealsService,
              private demoTableAutocolConfigService: DemoTableAutocolConfigService) {
  }

  ngOnInit(): void {
    this.demoTableAutocolConfigService.init()
      .subscribe(() => {
        this.availableColumns = this.demoTableAutocolConfigService.getAvailableColumns();
        this.selectedColumns = this.demoTableAutocolConfigService.getSelectedColumns();
        this.accordionColumns = this.demoTableAutocolConfigService.getAccordionColumns();
      });
  }

  doSearch(request: FilterPaginationOptions) {
    console.log('Searching deals: %o', request);
    this.dealsService.searchDeals(request)
      .subscribe(
        response => {
          this.lastRefreshTimestamp = new Date();
          this.searchResultsData = response;
          console.log('Found deals: %o', response);
        },
        () => this.searchResultsData = {loadingFailed: true}
      );
  }

  onColumnsSelectionChanged(selection: SelectedColumns) {
    console.log('Should save new set of columns: %o', selection);
    this.selectedColumns = selection.selected;
    this.accordionColumns = selection.accordion;
    this.demoTableAutocolConfigService.saveSelectedColumns(this.selectedColumns, this.accordionColumns)
      .subscribe(
        () => ({}),
        err => console.error('Cannot save columns: %o', err),
        () => console.log('Saved columns')
      );
  }

  onColumnResized(columnAndWidth: ColumnAndWidth) {
    console.log('Should set width %o for column %o', columnAndWidth.newPixelsWidth, columnAndWidth.column);
    this.demoTableAutocolConfigService.setAndSaveColumnWidth(columnAndWidth)
      .subscribe(
        () => ({}),
        err => console.error('Cannot save column widths: %o', err),
        () => console.log('Saved columns widths'),
      );
  }

  searchPopoverNeedsData(request: PopoverDataRequest) {
    console.log('search popover data request: %o', request);
    if (isLoadingFailed(this.searchResultsData)) {
      return;
    }

    if (request.column.key === 'uti') {
      // Use as an example to check out the error rendering
      request.domainSubject.error('error');
    } else {
      this.dealsService.getFilterDomain(toSearchColumnValuesRequest(request))
        .subscribe(
          data => request.domainSubject.next(data),
          err => request.domainSubject.error(err));
    }
  }

  showDetails(row: Deal) {
    alert('Showing details of ' + row.dealIdFe);
  }
}
