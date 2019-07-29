import {DynamicallyLoadedGrootPlugin} from '../../../../groot/src/lib/groot-arch/interfaces/groot-plugin';
import {Menu} from '../../../../groot/src/lib/groot-base/components/nav-bar/nav-bar.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class DocsArchGrootPlugin extends DynamicallyLoadedGrootPlugin {
  constructor() {
    super('Demo Arch', 'docs-arch', 'DocsArchModule');
  }

  protected importModule() {
    // @ts-ignore
    return import('./docs-arch.module');
  }

  getRootMenuEntries(): Menu[] | null {
    return null;
  }

  getTranslations(http: HttpClient, lang: string): Observable<any> {
    return super.loadTranslationsFromFile(http, lang, 'assets/i18n/docs-arch.');
  }
}
