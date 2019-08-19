import {Menu, SimpleNavBarItem} from '../../groot-base/components/nav-bar/nav-bar.model';
import {InjectionToken} from '@angular/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

/**
 * Base class for pluggable applications: you need to return the entries
 * that have to be placed in the menu bar and the routing configuration.
 * Note that you generally want to load the routes dinamically, so
 * you probably want to extend `DynamicallyLoadedGrootPlugin`.
 */
export abstract class GrootPlugin {
  constructor(public readonly name: string) {
    this.name = name;
  }

  getRootMenuEntries(): Menu[] | null {
    return null;
  }

  getSimpleNavBarItems(): SimpleNavBarItem[] | null {
    return null;
  }

  getTranslations(http: HttpClient, lang: string): Observable<any> {
    return of({});
  }

  protected loadTranslationsFromFile(http: HttpClient,
                                     lang: string,
                                     filePrefix: string)
    : Observable<object> {
    return new TranslateHttpLoader(http, filePrefix, '.json').getTranslation(lang);
  }
}

/**
 * Injection token for plugins. Use as follows, in the `providers` section
 * of your main app module:
 *
 * ```
 * {provide: GROOT_PLUGIN, useClass: MyGrootPlugin, multi: true},
 * ```
 */
export const GROOT_PLUGIN = new InjectionToken<GrootPlugin>('GROOT_PLUGIN');
