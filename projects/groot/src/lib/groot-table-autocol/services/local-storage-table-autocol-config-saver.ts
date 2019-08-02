import {ColumnWidths, TableAutocolConfigSaver} from './table-autocol-config-saver';
import {defer, EMPTY, Observable, of} from 'rxjs';

/**
 * Simple implementation of `TableAutocolConfigSaver` that saves the configuration
 * to the local storage.
 */
export class LocalStorageTableAutocolConfigSaver implements TableAutocolConfigSaver {
  saveColumnKeys(saveKey: string, colKeys: string[]): Observable<void> {
    return defer(() => {
      localStorage.setItem(saveKey, JSON.stringify(colKeys));
      return EMPTY;
    });
  }

  loadColumnKeysOrDefault(saveKey: string, defaultColKeys: string[]): Observable<string[]> {
    return defer(() => {
      const savedKeys = localStorage.getItem(saveKey);
      if (savedKeys) {
        return of(JSON.parse(savedKeys) as string[]);
      } else {
        return of(defaultColKeys);
      }
    });
  }

  saveColumnWidths(saveKey: string, colWidths: ColumnWidths): Observable<void> {
    return defer(() => {
      localStorage.setItem(saveKey, JSON.stringify(colWidths));
      return EMPTY;
    });
  }

  loadColumnWidths(saveKey: string): Observable<ColumnWidths> {
    return defer(() => {
      const savedWidths = localStorage.getItem(saveKey);
      if (!savedWidths) {
        return of({});
      }
      return of(JSON.parse(savedWidths) as ColumnWidths);
    });
  }
}
