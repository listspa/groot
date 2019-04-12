import {ComboDataRequest, FilterOption, PaginatedResponse, SearchColumnValuesRequest} from '../../groot-base/utils/pagination.model';
import {TableColumn} from './table-columns.model';
import {Subject} from 'rxjs';

export interface PopoverDataRequest extends ComboDataRequest {
  column: TableColumn;
  filters: FilterOption[];
  domainSubject: Subject<PaginatedResponse<string>>;
}

export function toSearchColumnValuesRequest(request: PopoverDataRequest): SearchColumnValuesRequest {
  return {
    pageNum: request.pageNum,
    pageLen: request.pageLen,
    filterText: request.filterText,
    columnName: request.column.columnName,
    filters: request.filters,
  };
}
