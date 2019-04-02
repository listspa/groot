import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingService} from '../../../../../groot/src/lib/groot-base/services/loading.service';
import {FilterPaginationOptions, PaginatedResponse} from '../../../../../groot/src/lib/groot-base/nbpu.interfaces';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {BASE_URL} from '../../constants';
import {tap} from 'rxjs/internal/operators/tap';
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
}

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  constructor(private http: HttpClient,
              private loadingService: LoadingService) {
  }

  searchDeals(request: FilterPaginationOptions): Observable<PaginatedResponse<Deal>> {
    const doneLoading = this.loadingService.startLoading();
    return this.http.get<PaginatedResponse<Deal>>(`${BASE_URL}/assets/deals.json`)
      .pipe(
        tap(response => {

          // Simulate pagination by sorting and filtering the returned json
          const rows = [...response.records];
          rows.sort(compareBy(request.sortField, request.sortReversed));
          const startIdx = request.pageNum * request.pageLen;
          const endIdx = (request.pageNum + 1) * request.pageLen;
          response.records = rows.slice(startIdx, endIdx);
        }),
        finalize(doneLoading));
  }
}
