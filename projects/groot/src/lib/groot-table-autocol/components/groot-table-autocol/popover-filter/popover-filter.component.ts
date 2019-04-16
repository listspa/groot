import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {TableColumn} from '../../../model/table-columns.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {
  ComboDataRequest,
  DomainElement,
  FilterOperator,
  FilterOption,
  NbpuSchemaFieldType,
  PaginatedResponse
} from '../../../../groot-base/utils/pagination.model';
import {isoDate} from '../../../../groot-base/utils/date-utils';

@Component({
  selector: 'groot-popover-filter',
  templateUrl: './popover-filter.component.html',
})
export class PopoverFilterComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClass = 'popover popover-filters';

  readonly COMBO_SIZE = 100;
  @Input() column: TableColumn;
  @Input() results: Subject<FilterOption>;
  @Input() domain$: Observable<PaginatedResponse<string>>;
  @Input() dataRequest: Subject<ComboDataRequest | null>;
  @Input() currentFilter: FilterOption;
  domainPage: PaginatedResponse<string>;
  loadingError = false;
  comparisonOperators: DomainElement[] = [{
    value: FilterOperator.EQUALS,
    label: '='
  }, {
    value: FilterOperator.LE,
    label: '<='
  }, {
    value: FilterOperator.LT,
    label: '<'
  }, {
    value: FilterOperator.GT,
    label: '>'
  }, {
    value: FilterOperator.GE,
    label: '>='
  }];
  selectedValues: string[];
  operator: FilterOperator;
  numericValue: number;
  dateValue: Date;
  private getSelectedValue: () => any;
  private hasSelectedValue: () => boolean;
  private domainSubscription: Subscription;

  clear() {
    this.results.next(null);
    this.close();
  }

  close() {
    this.results.complete();
  }

  apply() {
    if (!this.hasSelectedValue()) {
      this.results.next(null);
    } else {
      const filter: FilterOption = {
        column: this.column.columnName,
        type: this.column.columnType || NbpuSchemaFieldType.STRING,
        operator: this.operator,
        value: this.getSelectedValue()
      };
      this.results.next(filter);
    }
    this.close();
  }

  ngOnInit(): void {
    this.domainSubscription = this.domain$.subscribe(
      d => this.domainPage = d,
      () => this.loadingError = true);

    this.initOperatorAndValue();
  }

  private initOperatorAndValue() {
    switch (this.column.columnType || NbpuSchemaFieldType.STRING) {
      case NbpuSchemaFieldType.INT32:
      case NbpuSchemaFieldType.INT64:
      case NbpuSchemaFieldType.DOUBLE:
        this.operator = this.currentFilter ? this.currentFilter.operator : FilterOperator.EQUALS;
        this.numericValue = this.currentFilter ? this.currentFilter.value : null;
        this.getSelectedValue = () => this.numericValue;
        this.hasSelectedValue = () => Boolean(this.operator) && this.numericValue !== null;
        break;

      case NbpuSchemaFieldType.STRING:
      case NbpuSchemaFieldType.CLOB:
      case NbpuSchemaFieldType.ENUM:
      case NbpuSchemaFieldType.UUID:
      case NbpuSchemaFieldType.TIME:
        this.operator = FilterOperator.IN;
        this.selectedValues = this.currentFilter ? this.currentFilter.value : [];
        this.getSelectedValue = () => this.selectedValues;
        this.hasSelectedValue = () => this.selectedValues.length > 0;
        break;

      case NbpuSchemaFieldType.DATE:
      case NbpuSchemaFieldType.TIMESTAMP:
        this.operator = this.currentFilter ? this.currentFilter.operator : FilterOperator.EQUALS;
        this.dateValue = this.currentFilter ? new Date(this.currentFilter.value) : null;
        this.getSelectedValue = () => this.dateValue ? isoDate(this.dateValue) : null;
        this.hasSelectedValue = () => Boolean(this.operator) && this.dateValue !== null;
        break;

      // TODO
      // case NbpuSchemaFieldType.BOOLEAN:

      case NbpuSchemaFieldType.BLOB:
        break;
    }
  }

  ngOnDestroy(): void {
    this.domainSubscription.unsubscribe();
    this.dataRequest.complete();
  }

  comboDataRequest(event: ComboDataRequest) {
    this.dataRequest.next(event);
  }
}
