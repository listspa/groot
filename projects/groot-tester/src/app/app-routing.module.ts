import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoTabsComponent} from './demo-pages/demo-tabs/demo-tabs.component';
import {DemoButtonsComponent} from './demo-pages/demo-buttons/demo-buttons.component';
import {DemoLoadingComponent} from './demo-pages/demo-loading/demo-loading.component';
import {DemoToasterComponent} from './demo-pages/demo-toaster/demo-toaster.component';
import {DemoTableComponent} from './demo-pages/demo-table/demo-table.component';
import {DemoFormComponent} from './demo-pages/demo-form/demo-form.component';
import {DemoBoxComponent} from './demo-pages/demo-box/demo-box.component';
import {DemoModalsComponent} from './demo-pages/demo-modals/demo-modals.component';
import {DemoTooltipComponent} from './demo-pages/demo-tooltip/demo-tooltip.component';
import {DemoColorsComponent} from './demo-pages/demo-colors/demo-colors.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ExternalReferencesComponent} from './docs/external-references/external-references.component';
import {GettingStartedComponent} from './docs/getting-started/getting-started.component';
import {GrootStyleComponent} from './docs/groot-style/groot-style.component';
import {GettingHelpComponent} from './docs/getting-help/getting-help.component';
import {IconsComponent} from './docs/icons/icons.component';
import {IeSupportComponent} from './docs/ie-support/ie-support.component';
import {TranslationsGuideComponent} from './docs/translations-guide/translations-guide.component';
import {OtherUtilitiesComponent} from './demo-pages/other-utilities/other-utilities.component';
import {DemoNavbarComponent} from './demo-pages/demo-navbar/demo-navbar.component';
import {CallingTheServerComponent} from './docs/calling-the-server/calling-the-server.component';
import {CapabilitiesComponent} from './demo-pages/capabilities/capabilities.component';
import {DemoCompleteFormComponent} from './demo-pages/demo-complete-form/demo-complete-form.component';
import {DemoPageTitleComponent} from './demo-pages/demo-page-title/demo-page-title.component';
import {DemoFooterComponent} from './demo-pages/demo-footer/demo-footer.component';
import {DemoCardsComponent} from './demo-pages/demo-cards/demo-cards.component';
import {DemoTableAutocolComponent} from './demo-pages/demo-table-autocol/demo-table-autocol.component';
import {DemoSmallComponentsComponent} from './demo-pages/demo-small-components/demo-small-components.component';
import {DemoSidebarComponent} from './demo-pages/demo-sidebar/demo-sidebar.component';

const routes: Routes = [
  {component: HomepageComponent, path: 'home'},
  {component: GettingStartedComponent, path: 'docs/getting-started'},
  {component: ExternalReferencesComponent, path: 'docs/external-references'},
  {component: GrootStyleComponent, path: 'docs/groot-style'},
  {component: GettingHelpComponent, path: 'docs/getting-help'},
  {component: IconsComponent, path: 'docs/icons'},
  {component: IeSupportComponent, path: 'docs/ie-support'},
  {component: TranslationsGuideComponent, path: 'docs/translations-guide'},
  {component: CallingTheServerComponent, path: 'docs/calling-the-server'},
  {component: DemoButtonsComponent, path: 'demo/buttons'},
  {component: DemoTabsComponent, path: 'demo/tabs'},
  {component: DemoLoadingComponent, path: 'demo/loading'},
  {component: DemoToasterComponent, path: 'demo/toasts'},
  {component: DemoTableComponent, path: 'demo/tables'},
  {component: DemoTableAutocolComponent, path: 'demo/tables-autocol'},
  {component: DemoFormComponent, path: 'demo/forms'},
  {component: DemoBoxComponent, path: 'demo/boxes'},
  {component: DemoModalsComponent, path: 'demo/modals'},
  {component: DemoTooltipComponent, path: 'demo/tooltips'},
  {component: DemoColorsComponent, path: 'demo/colors'},
  {component: OtherUtilitiesComponent, path: 'demo/other-utilities'},
  {component: DemoNavbarComponent, path: 'demo/nav-bar'},
  {component: CapabilitiesComponent, path: 'demo/capabilities'},
  {component: DemoCompleteFormComponent, path: 'demo/complete-forms'},
  {component: DemoFooterComponent, path: 'demo/footer'},
  {component: DemoPageTitleComponent, path: 'demo/page-title', data: {pageTitle: {title: 'Page Title Demo', subTitle: 'Page sub title'}}},
  {component: DemoCardsComponent, path: 'demo/cards'},
  {component: DemoSmallComponentsComponent, path: 'demo/misc-small-components'},
  {component: DemoSidebarComponent, path: 'demo/sidebar'},
  {path: '', pathMatch: 'full', redirectTo: 'home'},

  {
    path: 'docs-arch',
    loadChildren: () => import('./docs-arch/docs-arch-wrapper.module').then(m => m.DocsArchWrapperModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
