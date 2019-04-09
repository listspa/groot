import {Pagination} from '../nbpu.interfaces';

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
