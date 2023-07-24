// tslint:disable:no-console

import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {GrootPlugin} from '../interfaces/groot-plugin';
import {Menu, SimpleNavBarItem} from '../../groot-base/components/nav-bar/nav-bar.model';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {filter, map, tap} from 'rxjs/operators';

/**
 * Core of the plugins system. Keeps registration of all the plugins
 * and sets up the router configuration.
 */
@Injectable({
  providedIn: 'root'
})
export class GrootPluginManagerService {
  private plugins: GrootPlugin[] = [];
  private _router: Router;
  private languagesLoaded = new Set<string>();

  constructor(private injector: Injector) {
  }

  get router(): Router {
    if (!this._router) {
      this._router = this.injector.get(Router);
    }
    return this._router;
  }

  registerPlugins(plugins: GrootPlugin[]) {
    plugins.forEach(plugin => this.registerPlugin(plugin));
  }

  private registerPlugin(plugin: GrootPlugin) {
    console.info('Registering arch plugin "%s"', plugin.name);
    this.plugins.push(plugin);
  }

  getMenuItems(): Menu[] {
    let items: Menu[] = [];
    this.plugins.map(plugin => plugin.getRootMenuEntries())
      .filter(v => v?.length)
      .forEach(pluginItems => items = items.concat(pluginItems));
    return items;
  }

  getSimpleNavBarItems(): SimpleNavBarItem[] {
    let items: SimpleNavBarItem[] = [];
    this.plugins.map(plugin => plugin.getSimpleNavBarItems())
      .filter(v => v?.length)
      .forEach(pluginItems => items = items.concat(pluginItems));
    return items;
  }

  initTranslationsLoader(translateService: TranslateService, http: HttpClient) {
    translateService.onLangChange
      .pipe(
        map(event => event.lang),
        filter(lang => !this.languagesLoaded.has(lang)),
        tap(lang => this.languagesLoaded.add(lang))
      )
      .subscribe(lang => this.loadAllTranslations(translateService, http, lang));
  }

  private loadAllTranslations(translateService: TranslateService, http: HttpClient, lang: string) {
    console.info('Loading plugins translations for language %s', lang);

    this.plugins.map(plugin => plugin.getTranslations(http, lang))
      .forEach(translationObs => translationObs.subscribe(
        pluginTransl => translateService.setTranslation(lang, pluginTransl, true)
      ));
  }

  getPlugins(): GrootPlugin[] {
    return [...this.plugins];
  }
}
