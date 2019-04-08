import {TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const GROOT_EN_TRANSLATIONS = {
  'common.searchResults': 'Results',
  'common.firstPage': 'First',
  'common.lastPage': 'Last',
  'common.paginationRowsInfo': 'Showing rows {{startRowIdx}} - {{endRowIdx}} out of {{totalItems}}',
  'common.noRowsFound': 'No rows found',
  'common.download': 'Download',
  'common.downloadExcel': 'Download Excel',
  'common.selectAll': 'Select all',
  'common.unselectAll': 'Unselect all',
  'common.allValuesSelected': 'All values selected',
  'common.oneValueSelected': 'One value selected',
  'common.numValuesSelected': '{{numSelected}} values selected',
  'common.required': 'The field is required',
  'common.dynamicGui.cannotLoad.title': 'Error',
  'common.dynamicGui.cannotLoad.details': 'Cannot load the records. Please try again later.',
  'common.dynamicGui.cannotSave.title': 'Error',
  'common.dynamicGui.cannotSave.details': 'Could not save your changes. Please try again later.',
  'common.dynamicGui.saved.title': 'Changes saved',
  'common.dynamicGui.saved.details': 'Your modifications have been saved correctly.',
  'common.browse': 'Browse',
  'common.upload': 'Upload',
  'common.collapse': 'Collapse',
  'common.expand': 'Expand',
  'common.cancel': 'Cancel',
  'common.save': 'Save',
  'common.delete': 'Delete',
  'common.confirm': 'Confirm',
  'common.pleaseConfirm': 'Please confirm',
  'common.yes': 'Yes',
  'common.no': 'No',
  'common.selectColumns': 'Select columns',
  'common.selectColumnsDragging': 'Drag and drop the columns between the lists',
  'common.columnsAvailable': 'Available',
  'common.columnsSelected': 'Selected',
  'common.columnsAccordion': 'Additional details',
  'common.dragHere': 'Drag here',
  'common.filter': 'Filter',
  'common.apply': 'Apply',
  'common.loading': 'Loading...',
  'common.clear': 'Clear',
  'combo.noItems': 'No items found',
  'combo.addItem': 'Add item',
  'combo.clearAll': 'Clear all',
  'combo.loading': 'Loading...',
  'combo.typeToSearch': 'Type to search',
};
const GROOT_IT_TRANSLATIONS = {
  'common.searchResults': 'Risultati',
  'common.firstPage': 'Primo',
  'common.lastPage': 'Ultimo',
  'common.paginationRowsInfo': 'Mostrate righe {{startRowIdx}} - {{endRowIdx}} di {{totalItems}}',
  'common.noRowsFound': 'Nessuna riga trovata',
  'common.download': 'Download',
  'common.downloadExcel': 'Scarica Excel',
  'common.selectAll': 'Seleziona tutti',
  'common.unselectAll': 'Deseleziona tutti',
  'common.allValuesSelected': 'Tutti i valori',
  'common.oneValueSelected': 'Un valore selezionato',
  'common.numValuesSelected': '{{numSelected}} valori selezionati',
  'common.required': 'Il campo è obbligatorio',
  'common.dynamicGui.cannotLoad.title': 'Errore',
  'common.dynamicGui.cannotLoad.details': 'Impossibile caricare i record. Si prega di ritentare in seguito.',
  'common.dynamicGui.cannotSave.title': 'Errore',
  'common.dynamicGui.cannotSave.details': 'Non è stato possibile salvare le modifiche. Si prega di ritentare in seguito.',
  'common.dynamicGui.saved.title': 'Modifiche salvate',
  'common.dynamicGui.saved.details': 'Le tue modifiche sono state salvate correttamente.',
  'common.browse': 'Scegli',
  'common.upload': 'Upload',
  'common.collapse': 'Collassa',
  'common.expand': 'Espandi',
  'common.cancel': 'Annulla',
  'common.save': 'Salva',
  'common.delete': 'Elimina',
  'common.confirm': 'Conferma',
  'common.pleaseConfirm': 'Conferma richiesta',
  'common.yes': 'Sì',
  'common.no': 'No',
  'common.selectColumns': 'Seleziona colonne',
  'common.selectColumnsDragging': 'Trascina le colonne tra le liste',
  'common.columnsAvailable': 'Disponibili',
  'common.columnsSelected': 'Selezionate',
  'common.columnsAccordion': 'Dettagli aggiuntivi',
  'common.dragHere': 'Trascina qua',
  'common.filter': 'Filtra',
  'common.apply': 'Applica',
  'common.loading': 'Caricamento...',
  'common.clear': 'Reset',
  'combo.noItems': 'Nessun elemento trovato',
  'combo.addItem': 'Aggiungi elemento',
  'combo.clearAll': 'Rimuovi tutti',
  'combo.loading': 'Caricamento...',
  'combo.typeToSearch': 'Scrivi per ricercare',
};
export const TRANSLATIONS_BY_LANG = {
  en: GROOT_EN_TRANSLATIONS,
  it: GROOT_IT_TRANSLATIONS
};

function getBuiltInTranslations(lang: string): object {
  return TRANSLATIONS_BY_LANG[lang] || {};
}

/**
 * Custom implementation of `TranslateHttpLoader` that adds the built-in groot
 * translations to the result.
 */
export class GrootTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient,
              public prefix = '/assets/i18n/',
              public suffix = '.json') {
  }

  /**
   * Gets the translations from the server, plus the one in Groot.
   */
  public getTranslation(lang: string): Observable<object> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`)
      .pipe(map(tr => {
        const grootBuiltinTranslations = getBuiltInTranslations(lang);
        return {...grootBuiltinTranslations, ...tr};
      }));
  }
}
