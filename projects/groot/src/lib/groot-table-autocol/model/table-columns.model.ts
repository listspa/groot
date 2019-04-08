import {TemplateRef} from '@angular/core';
import {NbpuSchemaFieldType} from '../../groot-base/nbpu.interfaces';

export interface TableColumn {
  key: string;
  label?: string;
  icon?: string | null;
  columnName?: string | null; // If null, it will not be sortable
  fieldName?: string;
  tdClassName?: string | string[] | null;
  columnType?: NbpuSchemaFieldType;
  customTemplate?: TemplateRef<any> | null;
  widthPx?: number | null;
  showFilters?: boolean;
}

export type TableColumns = TableColumn[];

/**
 * Returns a subset of the given columns, extracting them by their keys
 */
export function extractColumns(cols: TableColumns, ...colNames: string[]): TableColumns {
  const colsByKey = new Map();
  cols.forEach(c => colsByKey.set(c.key, c));
  return colNames.map(c => colsByKey.get(c)).filter(c => Boolean(c));
}

export interface SelectedColumns {
  selected: TableColumns;
  accordion: TableColumns;
}
