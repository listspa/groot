import {Menu} from '../../groot-base/components/nav-bar/nav-bar.model';
import {Route} from '@angular/router';
import {InjectionToken} from '@angular/core';

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

  abstract getRootMenuEntries(): Menu[] | null;

  abstract getRouterConfig(): Route[];
}


/**
 * Base class for pluggable applications that want to load their module
 * dynamically. You need to implement the function `importModule` to load
 * the module; you will generally write something like
 * `import('./my-angular.module')`. It's expected that the routes will be
 * exported by the lazily loaded angular module.
 */
export abstract class DynamicallyLoadedGrootPlugin extends GrootPlugin {
  constructor(name: string,
              private readonly routerUrl: string,
              private readonly moduleClassName: string) {
    super(name);
  }

  // tslint:disable:no-console
  getRouterConfig(): Route[] {
    return [{
      path: this.routerUrl,
      loadChildren: () => {
        console.info('Loading dynamically module %s...', this.name);
        return this.importModule()
          .then(m => {
            console.info('Successfully loaded module %s: %o', this.name, m);
            return m[this.moduleClassName];
          });
      }
    }];
  }

  protected abstract importModule();
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
