import {Injectable, InjectionToken, Injector, Type} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BsLocaleService} from 'ngx-bootstrap';
import {LanguageSaver, LocalStorageLanguageSaver} from './language-saver';

/**
 * Injection token to specify the default language. If not provided in your root module,
 * italian ('it') is used.
 */
export const DEFAULT_LANGUAGE = new InjectionToken<string>('DEFAULT_LANGUAGE');

/**
 * Service able to set and restore at startup the language in the whole application.
 *
 * @see LanguageSaver
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationsLanguageService {
  private readonly languageSaver: LanguageSaver;
  currLang: string;

  constructor(private translate: TranslateService,
              private localeService: BsLocaleService,
              injector: Injector) {
    this.languageSaver = injector.get(LanguageSaver as Type<LanguageSaver>, new LocalStorageLanguageSaver());
    const defaultLanguage = injector.get(DEFAULT_LANGUAGE, 'it');
    this.currLang = this.languageSaver.getSavedLanguage(defaultLanguage);
    this.setLang(this.currLang);
  }

  setLang(lang: string) {
    this.currLang = lang;
    this.translate.use(this.currLang);
    this.localeService.use(this.currLang);
    this.languageSaver.saveLanguage(this.currLang);
  }
}
