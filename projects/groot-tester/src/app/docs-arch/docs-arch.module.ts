import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {DocsArchPluginsComponent} from './docs-arch-plugins/docs-arch-plugins.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../constants';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

/**
 * Note: the routes are relative to the module, i.e. under `demo-arch`.
 */
const routes: Route[] = [
  {component: DocsArchPluginsComponent, path: 'plugins'}
];

export function DocsArchTranslationsLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${BASE_URL}/assets/i18n/docs-arch.`);
}

/**
 * This module will be lazily loaded by `DocsArchGrootPlugin` and the angular
 * router whenever the user wants to navigate to any of the routes in it.
 */
@NgModule({
  declarations: [
    DocsArchPluginsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      loader: {provide: TranslateLoader, useFactory: DocsArchTranslationsLoaderFactory, deps: [HttpClient]},
      isolate: false,
    })
  ]
})
export class DocsArchModule {
}
