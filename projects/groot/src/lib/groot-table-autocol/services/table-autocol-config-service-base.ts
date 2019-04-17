import {ColumnWidths, TableAutocolConfigSaver} from './table-autocol-config-saver';
import {LocalStorageTableAutocolConfigSaver} from './local-storage-table-autocol-config-saver';
import {extractColumns, TableColumns} from '../model/table-columns.model';
import {ColumnAndWidth} from '../components/groot-table-autocol/groot-table-autocol.component';

/**
 * Base class for a service that can be used with an autocol table
 * to save and restore the select and available columns.
 * It's specific to one table. We might eventually generalize to many
 * tables, but one step at a time. :-)
 */
export abstract class TableAutocolConfigServiceBase {
  protected constructor(
    private readonly availableColumns: TableColumns,
    private readonly defaultKeysSelected: string[],
    private readonly defaultKeysAccordion: string[],
    private readonly selectedColumnsSaveKey: string,
    private readonly accordionColumnsSaveKey: string,
    private readonly widthsSaveKey: string,
    private readonly saver: TableAutocolConfigSaver = new LocalStorageTableAutocolConfigSaver()) {
    this.loadColumnsWidths();
  }

  getAvailableColumns(): TableColumns {
    return this.availableColumns;
  }

  getSelectedColumns(): TableColumns {
    const keys = this.saver.loadColumnKeysOrDefault(this.selectedColumnsSaveKey, this.defaultKeysSelected);
    return extractColumns(this.getAvailableColumns(), ...keys);
  }

  getAccordionColumns(): TableColumns {
    const keys = this.saver.loadColumnKeysOrDefault(this.accordionColumnsSaveKey, this.defaultKeysAccordion);
    return extractColumns(this.getAvailableColumns(), ...keys);
  }

  saveSelectedColumns(selectedColumns: TableColumns, accordionColumns: TableColumns) {
    this.saveColumnKeys(this.selectedColumnsSaveKey, selectedColumns);
    this.saveColumnKeys(this.accordionColumnsSaveKey, accordionColumns);
  }

  private saveColumnKeys(key: string, columns: TableColumns) {
    const colKeys = columns.map(c => c.key);
    this.saver.saveColumnKeys(key, colKeys);
  }

  setAndSaveColumnWidth(columnAndWidth: ColumnAndWidth) {
    this.availableColumns
      .filter(c => c.key === columnAndWidth.column.key)
      .forEach(c => c.widthPx = columnAndWidth.newPixelsWidth);

    this.saveColumnsWidths();
  }

  private loadColumnsWidths() {
    const widths = this.saver.loadColumnWidths(this.widthsSaveKey);
    this.availableColumns
      .filter(c => widths.hasOwnProperty(c.key))
      .forEach(c => c.widthPx = widths[c.key]);
  }

  private saveColumnsWidths() {
    const columnWidths: ColumnWidths = {};
    this.availableColumns
      .filter(c => c.widthPx)
      .forEach(c => columnWidths[c.key] = c.widthPx);
    this.saver.saveColumnWidths(this.widthsSaveKey, columnWidths);
  }
}
