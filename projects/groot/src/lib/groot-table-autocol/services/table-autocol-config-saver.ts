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
  saveColumnKeys(saveKey: string, colKeys: string[]): void;

  loadColumnKeysOrDefault(saveKey: string, defaultColKeys: string[]): string[];

  saveColumnWidths(saveKey: string, colWidths: ColumnWidths): void;

  loadColumnWidths(saveKey: string): ColumnWidths;
}
