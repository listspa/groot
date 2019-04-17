import {ColumnWidths, TableAutocolConfigSaver} from './table-autocol-config-saver';

/**
 * Simple implementation of `TableAutocolConfigSaver` that saves the configuration
 * to the local storage.
 */
export class LocalStorageTableAutocolConfigSaver implements TableAutocolConfigSaver {
  saveColumnKeys(saveKey: string, colKeys: string[]): void {
    localStorage.setItem(saveKey, JSON.stringify(colKeys));
  }

  loadColumnKeysOrDefault(saveKey: string, defaultColKeys: string[]): string[] {
    const savedKeys = localStorage.getItem(saveKey);
    if (savedKeys) {
      return JSON.parse(savedKeys) as string[];
    } else {
      return defaultColKeys;
    }
  }

  saveColumnWidths(saveKey: string, colWidths: ColumnWidths): void {
    localStorage.setItem(saveKey, JSON.stringify(colWidths));
  }

  loadColumnWidths(saveKey: string): ColumnWidths {
    const savedWidths = localStorage.getItem(saveKey);
    if (!savedWidths) {
      return {};
    }
    return JSON.parse(savedWidths) as ColumnWidths;
  }
}
