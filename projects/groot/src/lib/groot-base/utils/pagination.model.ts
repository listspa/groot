// CRUD Responses

export interface PaginatedResponse<T> {
  records: T[];
  totalNumRecords: number;
  pageNum: number;
  pageLen: number;
}

export interface OKResponseWithMessage {
  status: 'ok';
  message: string;
}

// Domain elements

export interface DomainElement {
  value: string | boolean | number;
  label: string;
}

export interface CheckableDomainElement extends DomainElement {
  checked: boolean;
}

export type StringOrDomainElement = string | DomainElement;

export function isDomainElement(item: StringOrDomainElement): item is DomainElement {
  return (item as DomainElement).value !== undefined;
}

export function compareDomainElementLabel(d1: DomainElement, d2: DomainElement): number {
  const l1 = d1.label;
  const l2 = d2.label;
  return l1 > l2 ? +1 : (l1 < l2 ? -1 : 0);
}

export interface ValuesForFilters {
  values: { [key: string]: StringOrDomainElement[] };
}

export function toDomainElement(values: string[]): DomainElement[] {
  return values.map(v => {
    return {value: v, label: v};
  });
}

// CRUD Requests

export interface Sorting {
  column: string | null;
  reverse: boolean;
}

export interface Pagination {
  pageNum: number;
  pageLen: number;
}

export interface PaginationOptions extends Pagination {
  sortField: string;
  sortReversed: boolean;
}

export enum NbpuSchemaFieldType {
  INT32 = 'INT32',
  INT64 = 'INT64',
  STRING = 'STRING',
  DATE = 'DATE',
  TIME = 'TIME',
  TIMESTAMP = 'TIMESTAMP',
  BOOLEAN = 'BOOLEAN',
  DOUBLE = 'DOUBLE',
  BLOB = 'BLOB',
  CLOB = 'CLOB',
  ENUM = 'ENUM',
  UUID = 'UUID'
}

export enum FilterOperator {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  LT = 'LT',
  LE = 'LE',
  GT = 'GT',
  GE = 'GE',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  LIKE = 'LIKE',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL',
  NO_OPERATOR = 'NO_OPERATOR'
}

export interface FilterOption {
  column: string;
  type: NbpuSchemaFieldType;
  value?: any;
  valueTo?: any;
  operator: FilterOperator;
}

export interface FilterPaginationOptions extends PaginationOptions {
  filters: FilterOption[];
}

export interface ComboDataRequest extends Pagination {
  filterText?: string | null;
}

export interface SearchColumnValuesRequest extends ComboDataRequest {
  columnName: string;
  filters: FilterOption[];
}


// GUI metadata

export enum NbpuSearchDisplay {
  HIDE_FROM_SEARCH = 'HIDE_FROM_SEARCH',
  SHOW_OUTSIDE_FILTERS = 'SHOW_OUTSIDE_FILTERS',
  STANDARD_INPUT = 'STANDARD_INPUT',
  CLOSED_DOMAIN = 'CLOSED_DOMAIN',
  AUTOCOMPLETE = 'AUTOCOMPLETE'
}
