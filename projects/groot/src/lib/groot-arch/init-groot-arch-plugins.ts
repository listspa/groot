import {GrootPluginManagerService} from './services/groot-plugin-manager.service';
import {APP_INITIALIZER, Injector, Provider} from '@angular/core';
import {GROOT_PLUGIN, GrootPlugin} from './interfaces/groot-plugin';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';


/**
 * Initializes the plugin system, by manually invoking setup
 * of all the provided plugins.
 */
export function initGrootArchPlugins(injector: Injector): () => void {
  return () => {
    const pluginsManager = injector.get(GrootPluginManagerService);
    const plugins: GrootPlugin[] = injector.get(GROOT_PLUGIN) as any;
    pluginsManager.registerPlugins(plugins);

    const translateService = injector.get(TranslateService);
    const http = injector.get(HttpClient);
    pluginsManager.initTranslationsLoader(translateService, http);
  };
}

/**
 * Initialization provider for the plugin system. Has to be added to the list of
 * `providers` in the main application module.
 */
export const INIT_GROOT_ARCH_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initGrootArchPlugins,
  multi: true,
  deps: [Injector]
};
