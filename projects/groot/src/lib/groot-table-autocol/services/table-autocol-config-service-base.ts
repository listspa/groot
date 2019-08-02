import {ColumnWidths, TableAutocolConfigSaver} from './table-autocol-config-saver';
import {LocalStorageTableAutocolConfigSaver} from './local-storage-table-autocol-config-saver';
import {extractColumns, TableColumns} from '../model/table-columns.model';
import {ColumnAndWidth} from '../components/groot-table-autocol/groot-table-autocol.component';
import {forkJoin, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

/**
 * Base class for a service that can be used with an autocol table
 * to save and restore the select and available columns. Note that you
 * need to invoke the `init` method in your `onInit`.
 */
export abstract class TableAutocolConfigServiceBase {
  private selectedColumns: TableColumns;
  private accordionColumns: TableColumns;

  protected constructor(
    private readonly availableColumns: TableColumns,
    private readonly defaultKeysSelected: string[],
    private readonly defaultKeysAccordion: string[],
    private readonly selectedColumnsSaveKey: string,
    private readonly accordionColumnsSaveKey: string,
    private readonly widthsSaveKey: string,
    private readonly saver: TableAutocolConfigSaver = new LocalStorageTableAutocolConfigSaver()) {
  }

  getAvailableColumns(): TableColumns {
    return this.availableColumns;
  }

  getSelectedColumns(): TableColumns {
    return this.selectedColumns;
  }

  getAccordionColumns(): TableColumns {
    return this.accordionColumns;
  }

  private loadSelectedColumns(): Observable<any> {
    const keys$ = this.saver.loadColumnKeysOrDefault(this.selectedColumnsSaveKey, this.defaultKeysSelected);
    return keys$.pipe(
      tap(keys => this.selectedColumns = extractColumns(this.getAvailableColumns(), ...keys)));
  }

  private loadAccordionColumns(): Observable<any> {
    const keys$ = this.saver.loadColumnKeysOrDefault(this.accordionColumnsSaveKey, this.defaultKeysAccordion);
    return keys$.pipe(
      tap(keys => this.accordionColumns = extractColumns(this.getAvailableColumns(), ...keys)));
  }

  saveSelectedColumns(selectedColumns: TableColumns, accordionColumns: TableColumns): Observable<void> {
    const s1$ = this.saveColumnKeys(this.selectedColumnsSaveKey, selectedColumns);
    const s2$ = this.saveColumnKeys(this.accordionColumnsSaveKey, accordionColumns);
    return forkJoin(s1$, s2$).pipe(map(() => null));
  }

  private saveColumnKeys(key: string, columns: TableColumns): Observable<any> {
    const colKeys = columns.map(c => c.key);
    return this.saver.saveColumnKeys(key, colKeys);
  }

  setAndSaveColumnWidth(columnAndWidth: ColumnAndWidth): Observable<void> {
    this.availableColumns
      .filter(c => c.key === columnAndWidth.column.key)
      .forEach(c => c.widthPx = columnAndWidth.newPixelsWidth);

    return this.saveColumnsWidths();
  }

  private loadColumnsWidths(): Observable<any> {
    const widths$ = this.saver.loadColumnWidths(this.widthsSaveKey);
    return widths$.pipe(
      tap(widths => this.availableColumns
        .filter(c => widths.hasOwnProperty(c.key))
        .forEach(c => c.widthPx = widths[c.key])
      ));
  }

  private saveColumnsWidths(): Observable<void> {
    const columnWidths: ColumnWidths = {};
    this.availableColumns
      .filter(c => c.widthPx)
      .forEach(c => columnWidths[c.key] = c.widthPx);
    return this.saver.saveColumnWidths(this.widthsSaveKey, columnWidths);
  }

  init(): Observable<void> {
    const l1$ = this.loadColumnsWidths();
    const l2$ = this.loadSelectedColumns();
    const l3$ = this.loadAccordionColumns();
    return forkJoin(l1$, l2$, l3$).pipe(map(() => null));
  }
}
