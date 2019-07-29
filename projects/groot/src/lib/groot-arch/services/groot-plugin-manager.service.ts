import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {GrootPlugin} from '../interfaces/groot-plugin';
import {Menu} from '../../groot-base/components/nav-bar/nav-bar.model';

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
    // tslint:disable-next-line:no-console
    console.info('Registering arch plugin "%s"', plugin.name);
    this.plugins.push(plugin);

    this.router.config = this.router.config.concat(plugin.getRouterConfig());
  }

  getMenuItems(): Menu[] {
    let items: Menu[] = [];
    this.plugins.map(plugin => plugin.getRootMenuEntries())
      .filter(v => v && v.length)
      .forEach(pluginItems => items = items.concat(pluginItems));
    return items;
  }
}
