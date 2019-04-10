import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {extractColumns, SelectedColumns, TableColumns} from '../../../../../groot/src/lib/groot-table-autocol/model/table-columns.model';
import {isLoadingFailed, LoadingFailed} from '../../../../../groot/src/lib/groot-base/components/tables/groot-table/groot-table.component';
import {FilterPaginationOptions, NbpuSchemaFieldType, PaginatedResponse} from '../../../../../groot/src/lib/groot-base/nbpu.interfaces';
import {Deal, DealsService} from './deals-service';
import {
  ColumnAndWidth,
  PopoverDataRequest
} from '../../../../../groot/src/lib/groot-table-autocol/components/groot-table-autocol/groot-table-autocol.component';

@Component({
  selector: 'app-demo-table-autocol',
  templateUrl: './demo-table-autocol.component.html'
})
export class DemoTableAutocolComponent implements OnInit {
  searchResultsData: PaginatedResponse<Deal> | LoadingFailed;
  availableColumns: TableColumns;
  selectedColumns: TableColumns;
  accordionColumns: TableColumns;
  @ViewChild('dealIdTemplate') dealIdTemplate: TemplateRef<any>;
  @ViewChild('assetClassTemplate') assetClassTemplate: TemplateRef<any>;

  constructor(private dealsService: DealsService) {
  }

  ngOnInit(): void {
    this.availableColumns = [
      {
        key: 'fchubFeId',
        label: 'deals.fchubFeId',
        columnName: 'fchubFeId',
        fieldName: 'fchubFeId',
        showFilters: true
      },
      {
        key: 'soaCode',
        label: 'deals.soaCode',
        columnName: 'soaCode',
        fieldName: 'soaCode',
        showFilters: true
      },
      {
        key: 'branch',
        label: 'deals.branch',
        columnName: 'branch',
        fieldName: 'branch',
        showFilters: true
      },
      {
        key: 'dealIdFe',
        label: 'deals.dealIdFe',
        columnName: 'dealIdFe',
        fieldName: 'dealIdFe',
        customTemplate: this.dealIdTemplate,
        showFilters: true
      },
      {
        key: 'contractIdRootFe',
        label: 'deals.contractIdRootFe',
        columnName: 'contractIdRootFe',
        fieldName: 'contractIdRootFe',
        showFilters: true
      },
      {
        key: 'mFamily',
        label: 'deals.mFamily',
        columnName: 'mFamily',
        fieldName: 'mFamily',
        showFilters: true
      },
      {
        key: 'mGroup',
        label: 'deals.mGroup',
        columnName: 'mGroup',
        fieldName: 'mGroup',
        showFilters: true
      },
      {
        key: 'mType',
        label: 'deals.mType',
        columnName: 'mType',
        fieldName: 'mType',
        showFilters: true
      },
      // In addition to the raw three columns, we add a "virtual" column with special rendering
      {
        key: 'assetClass',
        label: 'deals.assetClass',
        customTemplate: this.assetClassTemplate
      },
      {
        key: 'packageIdFe',
        label: 'deals.packageIdFe',
        columnName: 'packageIdFe',
        fieldName: 'packageIdFe',
        widthPx: 350,
        showFilters: true
      },
      {
        key: 'uti',
        label: 'deals.uti',
        columnName: 'uti',
        fieldName: 'uti',
        showFilters: true
      },
      {
        key: 'tradeDate',
        label: 'deals.tradeDate',
        columnName: 'tradeDate',
        fieldName: 'tradeDate',
        columnType: NbpuSchemaFieldType.DATE
      },
      {
        key: 'ndgCode',
        label: 'deals.ndgCode',
        columnName: 'ndgCode',
        fieldName: 'ndgCode',
        showFilters: true
      },
      {
        key: 'shortDescription',
        label: 'deals.shortDescription',
        columnName: 'shortDescription',
        fieldName: 'shortDescription',
        showFilters: true
      },
      {
        key: 'arrivalTime',
        label: 'deals.arrivalTime',
        columnName: 'arrivalTime',
        fieldName: 'arrivalTime',
        columnType: NbpuSchemaFieldType.TIMESTAMP
      },
      {
        key: 'sendTime',
        label: 'deals.sendTime',
        columnName: 'sendTime',
        fieldName: 'sendTime',
        columnType: NbpuSchemaFieldType.TIMESTAMP
      },
      {
        key: 'msgTypeWeb',
        label: 'deals.msgTypeWeb',
        columnName: 'msgTypeWeb',
        fieldName: 'msgTypeWeb',
        showFilters: true
      },
      {
        key: 'des',
        label: 'deals.des',
        columnName: 'des',
        fieldName: 'des',
        showFilters: true
      },
      {
        key: 'reason',
        label: 'deals.reason',
        columnName: 'reason',
        fieldName: 'reason',
        showFilters: true
      },
    ];

    this.selectedColumns = extractColumns(this.availableColumns,
      'dealIdFe', 'packageIdFe', 'uti', 'tradeDate', 'des', 'reason');
    this.accordionColumns = extractColumns(this.availableColumns,
      'assetClass', 'mFamily', 'mGroup', 'mType', 'ndgCode', 'sendTime', 'arrivalTime');
  }

  doSearch(request: FilterPaginationOptions) {
    console.log('Searching deals: %o', request);
    this.dealsService.searchDeals(request)
      .subscribe(
        response => {
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
  }

  onColumnResized(columnAndWidth: ColumnAndWidth) {
    console.log('Should set width %o for column %o', columnAndWidth.newPixelsWidth, columnAndWidth.column);
    columnAndWidth.column.widthPx = columnAndWidth.newPixelsWidth;
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
      this.dealsService.getFilterDomain(request.column.fieldName, request.filters)
        .subscribe(request.domainSubject);
    }
  }
}
