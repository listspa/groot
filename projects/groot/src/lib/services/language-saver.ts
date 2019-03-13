/**
 * Generic interface for an object that can save the currently selected language.
 */
export abstract class LanguageSaver {
  abstract saveLanguage(lang: string): void;

  abstract getSavedLanguage(defaultLang: string): string;
}

/**
 * Simple implementation of LanguageSaver that uses the local storage.
 */
export class LocalStorageLanguageSaver extends LanguageSaver {
  saveLanguage(lang: string): void {
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      console.error('Could not save language to local storage');
    }
  }

  getSavedLanguage(defaultLang: string): string {
    try {
      return localStorage.getItem('lang') || defaultLang;
    } catch (e) {
      console.error('Could not read language from local storage');
      return defaultLang;
    }
  }
}
