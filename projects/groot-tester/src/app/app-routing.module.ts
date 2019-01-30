import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoHomeComponent} from './demo-pages/demo-home/demo-home.component';
import {DemoTabsComponent} from './demo-pages/demo-tabs/demo-tabs.component';
import {DemoButtonsComponent} from './demo-pages/demo-buttons/demo-buttons.component';

const routes: Routes = [
  {component: DemoHomeComponent, path: 'demo'},
  {component: DemoButtonsComponent, path: 'demo/buttons'},
  {component: DemoTabsComponent, path: 'demo/tabs'},
  {path: '', pathMatch: 'full', redirectTo: 'demo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
