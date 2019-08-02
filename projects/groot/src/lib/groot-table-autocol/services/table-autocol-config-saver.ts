import {Observable} from 'rxjs';

export interface ColumnWidths {
  [key: string]: number;
}

/**
 * Base interface of a service that can be used by `TableAutocolConfigServiceBase`
 * to save the table configuration to some persistent storage.
 *
 * @see LocalStorageTableAutocolConfigSaver
 */
export interface TableAutocolConfigSaver {
  saveColumnKeys(saveKey: string, colKeys: string[]): Observable<void>;

  loadColumnKeysOrDefault(saveKey: string, defaultColKeys: string[]): Observable<string[]>;

  saveColumnWidths(saveKey: string, colWidths: ColumnWidths): Observable<void>;

  loadColumnWidths(saveKey: string): Observable<ColumnWidths>;
}
