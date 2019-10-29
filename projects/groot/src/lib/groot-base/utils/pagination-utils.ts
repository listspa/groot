import {FilterOperator, FilterOption, NbpuSchemaFieldType, Pagination} from './pagination.model';
import {isoDate} from './date-utils';

/**
 * Retrieves the start index of a pagination object, zero-based, inclusive.
 */
export function startIndex(pagination: Pagination): number {
  return pagination.pageNum * pagination.pageLen;
}

/**
 * Retrieves the end index of a pagination object, zero-based, exclusive.
 */
export function endIndex(pagination: Pagination): number {
  return (1 + pagination.pageNum) * pagination.pageLen;
}

/**
 * Creates the most common type of filter: column equal to one value.
 */
export function filterEquals(column: string,
                             value: any,
                             type: NbpuSchemaFieldType = NbpuSchemaFieldType.STRING)
  : FilterOption {
  return {column, type, operator: FilterOperator.EQUALS, value};
}

/**
 * Creates a very common type of filter: column in array of values.
 */
export function filterIn(column: string,
                         value: any[],
                         type: NbpuSchemaFieldType = NbpuSchemaFieldType.STRING)
  : FilterOption {
  return {column, type, operator: FilterOperator.IN, value};
}

/**
 * Creates a very common type of filter: column like string
 */
export function filterLike(column: string,
                           value: string)
  : FilterOption {
  return {
    column: `UPPER(${column})`,
    type: NbpuSchemaFieldType.STRING,
    operator: FilterOperator.LIKE,
    value: `%${(value || '').toUpperCase()}%`
  };
}

/**
 * Creates a very common type of filter: TRUNC(date) equals value
 */
export function filterTimestamp(column: string,
                                value: Date)
  : FilterOption {
  return {
    column: `TRUNC(${column})`,
    type: NbpuSchemaFieldType.DATE,
    operator: FilterOperator.EQUALS,
    value: isoDate(value)
  };
}
