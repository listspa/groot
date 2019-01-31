import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoHomeComponent} from './demo-pages/demo-home/demo-home.component';
import {DemoTabsComponent} from './demo-pages/demo-tabs/demo-tabs.component';
import {DemoButtonsComponent} from './demo-pages/demo-buttons/demo-buttons.component';
import {DemoLoadingComponent} from './demo-pages/demo-loading/demo-loading.component';
import {DemoToasterComponent} from './demo-pages/demo-toaster/demo-toaster.component';
import {DemoTableComponent} from './demo-pages/demo-table/demo-table.component';

const routes: Routes = [
  {component: DemoHomeComponent, path: 'demo'},
  {component: DemoButtonsComponent, path: 'demo/buttons'},
  {component: DemoTabsComponent, path: 'demo/tabs'},
  {component: DemoLoadingComponent, path: 'demo/loading'},
  {component: DemoToasterComponent, path: 'demo/toasts'},
  {component: DemoTableComponent, path: 'demo/tables'},
  {path: '', pathMatch: 'full', redirectTo: 'demo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
