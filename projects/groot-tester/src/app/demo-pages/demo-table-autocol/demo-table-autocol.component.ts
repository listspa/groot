import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  extractColumns,
  SelectedColumns,
  TableColumnRendering,
  TableColumns
} from '../../../../../groot/src/lib/groot-table-autocol/model/table-columns.model';
import {isLoadingFailed, LoadingFailed} from '../../../../../groot/src/lib/groot-base/components/tables/groot-table/groot-table.component';
import {PaginatedResponse, PaginationOptions} from '../../../../../groot/src/lib/groot-base/nbpu.interfaces';
import {Deal, DealsService} from './deals-service';
import {
  ColumnAndWidth,
  PopoverDataRequest
} from '../../../../../groot/src/lib/groot-table-autocol/components/groot-table-autocol/groot-table-autocol.component';
import {timer} from 'rxjs';

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
        fieldName: 'fchubFeId'
      },
      {
        key: 'soaCode',
        label: 'deals.soaCode',
        columnName: 'soaCode',
        fieldName: 'soaCode'
      },
      {
        key: 'branch',
        label: 'deals.branch',
        columnName: 'branch',
        fieldName: 'branch'
      },
      {
        key: 'dealIdFe',
        label: 'deals.dealIdFe',
        columnName: 'dealIdFe',
        fieldName: 'dealIdFe',
        customTemplate: this.dealIdTemplate
      },
      {
        key: 'contractIdRootFe',
        label: 'deals.contractIdRootFe',
        columnName: 'contractIdRootFe',
        fieldName: 'contractIdRootFe'
      },
      {
        key: 'mFamily',
        label: 'deals.mFamily',
        columnName: 'mFamily',
        fieldName: 'mFamily'
      },
      {
        key: 'mGroup',
        label: 'deals.mGroup',
        columnName: 'mGroup',
        fieldName: 'mGroup'
      },
      {
        key: 'mType',
        label: 'deals.mType',
        columnName: 'mType',
        fieldName: 'mType'
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
        widthPx: 350
      },
      {
        key: 'uti',
        label: 'deals.uti',
        columnName: 'uti',
        fieldName: 'uti'
      },
      {
        key: 'tradeDate',
        label: 'deals.tradeDate',
        columnName: 'tradeDate',
        fieldName: 'tradeDate',
        rendering: TableColumnRendering.DATE
      },
      {
        key: 'ndgCode',
        label: 'deals.ndgCode',
        columnName: 'ndgCode',
        fieldName: 'ndgCode'
      },
      {
        key: 'shortDescription',
        label: 'deals.shortDescription',
        columnName: 'shortDescription',
        fieldName: 'shortDescription'
      },
      {
        key: 'arrivalTime',
        label: 'deals.arrivalTime',
        columnName: 'arrivalTime',
        fieldName: 'arrivalTime',
        rendering: TableColumnRendering.TIMESTAMP
      },
      {
        key: 'sendTime',
        label: 'deals.sendTime',
        columnName: 'sendTime',
        fieldName: 'sendTime',
        rendering: TableColumnRendering.TIMESTAMP
      },
      {
        key: 'msgTypeWeb',
        label: 'deals.msgTypeWeb',
        columnName: 'msgTypeWeb',
        fieldName: 'msgTypeWeb'
      },
      {
        key: 'des',
        label: 'deals.des',
        columnName: 'des',
        fieldName: 'des'
      },
      {
        key: 'reason',
        label: 'deals.reason',
        columnName: 'reason',
        fieldName: 'reason'
      },
    ];

    this.selectedColumns = extractColumns(this.availableColumns,
      'dealIdFe', 'packageIdFe', 'uti', 'tradeDate', 'des', 'reason');
    this.accordionColumns = extractColumns(this.availableColumns,
      'assetClass', 'mFamily', 'mGroup', 'mType', 'ndgCode', 'sendTime', 'arrivalTime');
  }

  doSearch(pagination: PaginationOptions) {
    const request = {...pagination, filters: []};
    this.dealsService.searchDeals(request)
      .subscribe(
        response => this.searchResultsData = response,
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

  onColumnNeedsData(request: PopoverDataRequest) {
    timer(1200)
      .subscribe(() => {
        if (isLoadingFailed(this.searchResultsData)) {
          return;
        }

        // Very simple algorithm: extracts the values from the visible rows
        const rawItems = this.searchResultsData.records
          .map(r => r[request.column.fieldName])
          .filter(v => v);
        const distinctItems = Array.from(new Set<string>(rawItems).values());
        distinctItems.sort();
        request.items = distinctItems;
      });
  }
}
