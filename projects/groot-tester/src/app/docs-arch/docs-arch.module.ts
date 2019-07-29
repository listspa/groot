import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {DocsArchPluginsComponent} from './docs-arch-plugins/docs-arch-plugins.component';

/**
 * Note: the routes are relative to the module, i.e. under `demo-arch`.
 */
const routes: Route[] = [
  {component: DocsArchPluginsComponent, path: 'plugins'}
];

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
    RouterModule.forChild(routes)
  ]
})
export class DocsArchModule {
}
