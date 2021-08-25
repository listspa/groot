import {TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
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
  'common.clearSelection': 'Clear selection',
  'common.allValuesSelected': 'All values selected',
  'common.oneValueSelected': 'One value selected',
  'common.numValuesSelected': '{{numSelected}} values selected',
  'common.required': 'The field is required',
  'common.dynamicGui.cannotLoad.title': 'Error',
  'common.dynamicGui.cannotLoad.details': 'Cannot load the records. Please try again later.',
  'common.dynamicGui.cannotDownload.title': 'Error',
  'common.dynamicGui.cannotDownload.details': 'Cannot download the file. Please try again later.',
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
  'common.selectColumns.help': 'Drag the columns to select them',
  'common.selectColumns.available': 'Available columns',
  'common.selectColumns.empty': 'No more available column',
  'common.selectColumns.selected': 'Selected columns',
  'common.dragHere': 'Drag here',
  'common.filter': 'Filter',
  'common.apply': 'Apply',
  'common.loading': 'Loading...',
  'common.clear': 'Clear',
  'common.cannotLoadFilters': 'Cannot load filters. Please try again later.',
  'common.actions': 'Actions',
  'common.close': 'Close',
  'common.insert': 'Insert',
  'common.add': 'Add',
  'common.reset': 'Reset',
  'common.search': 'Search',
  'common.list': 'List',
  'common.view': 'View details',
  'common.numRowsFound': 'Found:',
  'common.edit': 'Edit',
  'common.remove': 'Remove',
  'common.numRowsSelected': 'Selected:',
  'common.showHistory': 'Show history',
  'common.quickSearch': 'Quick search',
  'common.showFilters': 'Show filters',
  'common.hideFilters': 'Hide filters',
  'common.showMoreFilters': 'Show additional filters',
  'common.hideMoreFilters': 'Hide additional filters',
  'combo.noItems': 'No items found',
  'combo.addItem': 'Add item',
  'combo.clearAll': 'Clear all',
  'combo.loading': 'Loading...',
  'combo.typeToSearch': 'Type to search',
  'combo.showOnlySelected': 'Show only selected',
  'table.lastRefreshTimestamp': 'Last update: ',
  'common.search.reset': 'Reset filters',
  'common.search.noFilters': 'No filter applied',
  'common.menu.search.placeholder': 'Search in menu',
  'common.menu.search.pleaseEnterSearchText': 'Please enter some search criteria',
  'common.menu.search.noResults': 'No menu item matches your criteria',
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
  'common.clearSelection': 'Deseleziona tutti',
  'common.allValuesSelected': 'Tutti i valori',
  'common.oneValueSelected': 'Un valore selezionato',
  'common.numValuesSelected': '{{numSelected}} valori selezionati',
  'common.required': 'Il campo è obbligatorio',
  'common.dynamicGui.cannotLoad.title': 'Errore',
  'common.dynamicGui.cannotLoad.details': 'Impossibile caricare i record. Si prega di ritentare in seguito.',
  'common.dynamicGui.cannotDownload.title': 'Errore',
  'common.dynamicGui.cannotDownload.details': 'Impossibile scaricare il file. Si prega di ritentare in seguito.',
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
  'common.selectColumns.help': 'Trascina le colonne per nasconderle o aggiungerle alla tabella',
  'common.selectColumns.available': 'Colonne disponibili',
  'common.selectColumns.empty': 'Nessuna colonna disponibile',
  'common.selectColumns.selected': 'Colonne selezionate',
  'common.dragHere': 'Trascina qua',
  'common.filter': 'Filtra',
  'common.apply': 'Applica',
  'common.loading': 'Caricamento...',
  'common.clear': 'Reset',
  'common.cannotLoadFilters': 'Impossibile caricare i filtri. Si prega di ritentare in seguito.',
  'common.actions': 'Azioni',
  'common.close': 'Chiudi',
  'common.insert': 'Inserisci',
  'common.add': 'Aggiungi',
  'common.reset': 'Reset',
  'common.search': 'Cerca',
  'common.list': 'Lista',
  'common.view': 'Vedi dettagli',
  'common.numRowsFound': 'Trovate:',
  'common.edit': 'Modifica',
  'common.remove': 'Rimuovi',
  'common.numRowsSelected': 'Selezionate:',
  'common.showHistory': 'Mostra storia',
  'common.quickSearch': 'Ricerca veloce',
  'common.showFilters': 'Mostra filtri',
  'common.hideFilters': 'Nascondi filtri',
  'common.showMoreFilters': 'Mostra filtri aggiuntivi',
  'common.hideMoreFilters': 'Nascondi filtri aggiuntivi',
  'combo.noItems': 'Nessun elemento trovato',
  'combo.addItem': 'Aggiungi elemento',
  'combo.clearAll': 'Rimuovi tutti',
  'combo.loading': 'Caricamento...',
  'combo.typeToSearch': 'Scrivi per ricercare',
  'combo.showOnlySelected': 'Mostra solo selezionati',
  'table.lastRefreshTimestamp': 'Ultimo aggiornamento: ',
  'common.search.reset': 'Rimuovi filtri',
  'common.search.noFilters': 'Nessun filtro applicato',
  'common.menu.search.placeholder': 'Cerca nel menu',
  'common.menu.search.pleaseEnterSearchText': 'Inserisci del testo per cercare',
  'common.menu.search.noResults': 'Nessuna voce di menu corrisponde al testo inserito',
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

  private _translationFiles: {prefix: string, suffix: string}[] = [];

  constructor(private http: HttpClient,
              public prefix = '/assets/i18n/',
              public suffix = '.json') {
    this._translationFiles.push({prefix, suffix});
  }

  public withAdditionalTranslation(prefix: string = '/assets/i18n/', suffix: string = '.json'): GrootTranslateHttpLoader {
    this._translationFiles.push({prefix, suffix});
    return this;
  }

  /**
   * Gets the translations from the server, plus the one in Groot.
   */
  public getTranslation(lang: string): Observable<object> {
    const observables = this._translationFiles.map(value => this.http.get(`${value.prefix}${lang}${value.suffix}`));
    return forkJoin<object>(observables).pipe(map(forkResult => {
        const grootBuiltinTranslations = getBuiltInTranslations(lang);
        let ret: object = {...grootBuiltinTranslations};
        forkResult.forEach(tr => ret = {...ret, ...tr});
        return ret;
      }));
  }
}
