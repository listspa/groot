import {TemplateRef} from '@angular/core';

export enum TableColumnRendering {
  STRING,
  NUMBER,
  INTEGER,
  DATE,
  TIMESTAMP
}

export interface TableColumn {
  key: string;
  label?: string;
  icon?: string | null;
  columnName?: string | null; // If null, it will not be sortable
  fieldName?: string;
  tdClassName?: string | string[] | null;
  rendering?: TableColumnRendering;
  customTemplate?: TemplateRef<any> | null;
}

export type TableColumns = TableColumn[];

/**
 * Returns a subset of the given columns, extracting them by their keys
 */
export function extractColumns(cols: TableColumns, ...colNames: string[]): TableColumns {
  const colNamesSet = new Set<string>(colNames);
  return cols.filter(c => colNamesSet.has(c.key));
}

export interface SelectedColumns {
  selected: TableColumns;
  accordion: TableColumns;
}