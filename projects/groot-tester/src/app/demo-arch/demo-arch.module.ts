import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoArchPageComponent} from './demo-arch-page/demo-arch-page.component';
import {Route, RouterModule} from '@angular/router';

/**
 * Note: the routes are relative to the module, i.e. under `demo-arch`.
 */
const routes: Route[] = [
  {component: DemoArchPageComponent, path: 'page'}
];

/**
 * This module will be lazily loaded by `DemoArchGrootPlugin` and the angular
 * router whenever the user wants to navigate to any of the routes in it.
 */
@NgModule({
  declarations: [DemoArchPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DemoArchModule {
}
