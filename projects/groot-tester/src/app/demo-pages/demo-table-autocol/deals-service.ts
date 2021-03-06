import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingService} from '../../../../../groot/src/lib/groot-base/services/loading.service';
import {
  FilterOperator,
  FilterOption,
  FilterPaginationOptions,
  PaginatedResponse,
  SearchColumnValuesRequest
} from '../../../../../groot/src/lib/groot-base/utils/pagination.model';
import {Observable, of} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {BASE_URL} from '../../constants';
import {compareBy} from '../../../../../groot/src/lib/groot-base/utils/compare-by';

export interface Deal {
  fchubFeId: string;
  soaCode: string;
  branch: string;
  dealIdFe: string;
  contractIdRootFe: string;
  mFamily: string;
  mGroup: string;
  mType: string;
  packageIdFe: string;
  uti: string;
  tradeDate: string;
  ndgCode: string;
  shortDescription: string;
  arrivalTime: string;
  sendTime: string;
  msgTypeWeb: string;
  des: string;
  reason: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  private cachedDealsResponse: PaginatedResponse<Deal> = null;

  constructor(private http: HttpClient,
              private loadingService: LoadingService) {
  }

  searchDeals(request: FilterPaginationOptions): Observable<PaginatedResponse<Deal>> {
    const doneLoading = this.loadingService.startLoading();
    return this.getDeals()
      .pipe(
        map(response => {
          // Simulate pagination by sorting and filtering the returned json
          const rows = this.filter(request.filters, response.records);
          rows.sort(compareBy(request.sortField, request.sortReversed));
          const startIdx = request.pageNum * request.pageLen;
          const endIdx = (request.pageNum + 1) * request.pageLen;
          return {
            ...response,
            records: rows.slice(startIdx, endIdx),
            totalNumRecords: rows.length
          };
        }),
        finalize(doneLoading));
  }

  private filter(filters: FilterOption[], records: Deal[]) {
    return records.filter(rec => {
      return filters.every(filter => this.filterMatches(filter, rec));
    });
  }

  private filterMatches(filter: FilterOption, rec: Deal) {
    const value = rec[filter.column];

    switch (filter.operator) {
      case FilterOperator.EQUALS:
        return value === filter.value;

      case FilterOperator.NOT_EQUALS:
        return value !== filter.value;

      case FilterOperator.LT:
        return value < filter.value;

      case FilterOperator.LE:
        return value <= filter.value;

      case FilterOperator.GT:
        return value > filter.value;

      case FilterOperator.GE:
        return value >= filter.value;

      case FilterOperator.IN:
        return (filter.value as any[]).some(s => value === s);

      // etc etc
    }
    return false;
  }

  getFilterDomain(request: SearchColumnValuesRequest): Observable<PaginatedResponse<string>> {
    return this.getDeals()
      .pipe(map(response => {
        // Very simple algorithm: extracts the values from the visible rows
        const rows = this.filter(request.filters, response.records);
        const rawItems: string[] = rows
          .map(r => r[request.columnName])
          .filter(v => v);
        const distinctItems: string[] = Array.from(
          new Set<string>(rawItems).values());
        distinctItems.sort();

        return {
          pageNum: request.pageNum,
          pageLen: request.pageLen,
          records: distinctItems,
          totalNumRecords: distinctItems.length
        };
      }));
  }

  private getDeals(): Observable<PaginatedResponse<Deal>> {
    if (this.cachedDealsResponse) {
      return of(this.cachedDealsResponse);
    } else {
      return this.http.get<PaginatedResponse<Deal>>(`${BASE_URL}/assets/deals.json`)
        .pipe(tap(response => this.cachedDealsResponse = response));
    }
  }
}
