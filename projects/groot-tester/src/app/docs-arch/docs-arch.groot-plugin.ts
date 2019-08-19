import {GrootPlugin} from '../../../../groot/src/lib/groot-arch/interfaces/groot-plugin';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class DocsArchGrootPlugin extends GrootPlugin {
  constructor() {
    super('Demo Arch');
  }

  getTranslations(http: HttpClient, lang: string): Observable<any> {
    return super.loadTranslationsFromFile(http, lang, 'assets/i18n/docs-arch.');
  }
}
