import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {TableColumn} from '../../../model/table-columns.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {ComboDataRequest} from '../../../../groot-base/nbpu.interfaces';

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
  @Input() domain$: Observable<string[]>;
  @Input() totalLength$: Observable<number>;
  @Input() dataRequest: Subject<ComboDataRequest>;
  domainPage: string[] | null;
  totalLength: number | null;
  loadingError = false;
  private domainSubscription: Subscription;
  private totalLengthSubscription: Subscription;

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
    this.totalLengthSubscription = this.totalLength$.subscribe(
      l => this.totalLength = l,
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
