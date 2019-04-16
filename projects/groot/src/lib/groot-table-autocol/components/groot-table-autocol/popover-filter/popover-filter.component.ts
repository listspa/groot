import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {TableColumn} from '../../../model/table-columns.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {
  ComboDataRequest,
  DomainElement,
  FilterOperator,
  PaginatedResponse
} from '../../../../groot-base/utils/pagination.model';

@Component({
  selector: 'groot-popover-filter',
  templateUrl: './popover-filter.component.html',
})
export class PopoverFilterComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClass = 'popover popover-filters';

  readonly COMBO_SIZE = 100;
  @Input() column: TableColumn;
  @Input() results: Subject<string[] | null>;
  @Input() selectedValues: string[] = [];
  @Input() domain$: Observable<PaginatedResponse<string>>;
  @Input() dataRequest: Subject<ComboDataRequest>;
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
  private domainSubscription: Subscription;

  clear() {
    this.results.next(null);
    this.close();
  }

  close() {
    this.results.complete();
  }

  apply() {
    this.results.next(this.selectedValues);
    this.close();
  }

  ngOnInit(): void {
    this.domainSubscription = this.domain$.subscribe(
      d => this.domainPage = d,
      () => this.loadingError = true);
  }

  ngOnDestroy(): void {
    this.domainSubscription.unsubscribe();
    this.dataRequest.complete();
  }

  comboDataRequest(event: ComboDataRequest) {
    this.dataRequest.next(event);
  }
}
