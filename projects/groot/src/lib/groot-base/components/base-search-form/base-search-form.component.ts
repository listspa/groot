import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {dropDownOnCreateAnimation, emptyEnterAnimation} from '../../utils/animations-utils';
import {unsubscribeSafe} from '../../utils/subscription-utils';

@Component({
  selector: 'groot-base-search-form',
  templateUrl: './base-search-form.component.html',
  animations: [dropDownOnCreateAnimation, emptyEnterAnimation]
})
export class GrootBaseSearchFormComponent implements OnInit, OnDestroy {
  @Input() viewNameForSavingQueries: string = null;

  @Output() reset = new EventEmitter<void>();
  @Output() search = new EventEmitter<void>();
  @Output() saveQuery = new EventEmitter<void>();

  /** Whether we have at least one active filter */
  @Input() filtersActive = false;
  @Input() showLeftHeaderIfOpen = true;

  @Input() filtersShowing = false;
  @Input() moreFiltersShowing: boolean;
  @Input() hasMoreFilters = false;

  private loadQuerySub: Subscription;

  ngOnInit(): void {
    this.resetAndSearch();
  }

  ngOnDestroy(): void {
    unsubscribeSafe(this.loadQuerySub);
  }

  toggleFiltersShowing(): void {
    this.filtersShowing = !this.filtersShowing;
  }

  toggleMoreFiltersShowing(): void {
    this.moreFiltersShowing = !this.moreFiltersShowing;
  }

  resetClicked(): void {
    this.reset.next();
  }

  searchClicked(): void {
    this.search.next();
  }

  resetAndSearch(): void {
    this.resetClicked();
    this.searchClicked();
  }
}
