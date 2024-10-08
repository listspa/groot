import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GrootModule} from '../../../groot/src/lib/groot-base/groot.module';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DemoButtonsComponent} from './demo-pages/demo-buttons/demo-buttons.component';
import {DemoTabsComponent} from './demo-pages/demo-tabs/demo-tabs.component';
import {AppRoutingModule} from './app-routing.module';
import {DemoLoadingComponent} from './demo-pages/demo-loading/demo-loading.component';
import {DemoToasterComponent} from './demo-pages/demo-toaster/demo-toaster.component';
import {DemoTableComponent} from './demo-pages/demo-table/demo-table.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DemoFormComponent} from './demo-pages/demo-form/demo-form.component';
import {grootConfigBsDatePicker} from '../../../groot/src/lib/groot-base/components/forms/groot-date-picker/groot-date-picker-config';
import {GrootMissingTranslationLogger} from '../../../groot/src/lib/groot-base/utils/missing-translation-logger';
import {ConsoleLoggingService} from '../../../groot/src/lib/groot-base/services/console-logging.service';
import {DemoBoxComponent} from './demo-pages/demo-box/demo-box.component';
import {DemoModalsComponent} from './demo-pages/demo-modals/demo-modals.component';
import {DemoTooltipComponent} from './demo-pages/demo-tooltip/demo-tooltip.component';
import {DemoColorsComponent} from './demo-pages/demo-colors/demo-colors.component';
import {BASE_URL} from './constants';
import {HomepageComponent} from './homepage/homepage.component';
import {GettingStartedComponent} from './docs/getting-started/getting-started.component';
import {ExternalReferencesComponent} from './docs/external-references/external-references.component';
import {GrootStyleComponent} from './docs/groot-style/groot-style.component';
import {GettingHelpComponent} from './docs/getting-help/getting-help.component';
import {IconsComponent} from './docs/icons/icons.component';
import {IeSupportComponent} from './docs/ie-support/ie-support.component';
import {TranslationsGuideComponent} from './docs/translations-guide/translations-guide.component';
import {OtherUtilitiesComponent} from './demo-pages/other-utilities/other-utilities.component';
import {DemoNavbarComponent} from './demo-pages/demo-navbar/demo-navbar.component';
import {CallingTheServerComponent} from './docs/calling-the-server/calling-the-server.component';
import {ReleaseComponent} from './homepage/release/release.component';
import {GrootCapabilityService} from '../../../groot/src/lib/groot-base/services/capability.service';
import {DemoCapabilityService} from './demo-capability.service';
import {CapabilitiesComponent} from './demo-pages/capabilities/capabilities.component';
import {DemoCompleteFormComponent} from './demo-pages/demo-complete-form/demo-complete-form.component';
import {DemoPageTitleComponent} from './demo-pages/demo-page-title/demo-page-title.component';
import {DemoFooterComponent} from './demo-pages/demo-footer/demo-footer.component';
import {DEFAULT_LANGUAGE} from '../../../groot/src/lib/groot-base/services/translations-language.service';
import {DemoCardsComponent} from './demo-pages/demo-cards/demo-cards.component';
import {GrootTranslateHttpLoader} from '../../../groot/src/lib/groot-base/utils/groot-translations';
import {GrootTableAutocolModule} from '../../../groot/src/lib/groot-table-autocol/groot-table-autocol.module';
import {DemoTableAutocolComponent} from './demo-pages/demo-table-autocol/demo-table-autocol.component';
import {DemoSmallComponentsComponent} from './demo-pages/demo-small-components/demo-small-components.component';
import {INIT_GROOT_ARCH_PROVIDER} from '../../../groot/src/lib/groot-arch/init-groot-arch-plugins';
import {GROOT_PLUGIN} from '../../../groot/src/lib/groot-arch/interfaces/groot-plugin';
import {DocsArchGrootPlugin} from './docs-arch/docs-arch.groot-plugin';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoSidebarComponent} from './demo-pages/demo-sidebar/demo-sidebar.component';
import {defineLocale, itLocale} from 'ngx-bootstrap/chronos';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {DemoBaseSearchFormComponent} from './demo-pages/demo-base-search-form/demo-base-search-form.component';
import {GrootCurrencyModule} from '../../../groot/src/lib/groot-currency/groot-currency.module';
import { DemoTestFormComponent } from './demo-pages/demo-test-form/demo-test-form.component';

// Enable italian locale
registerLocaleData(localeIt);
defineLocale('it', itLocale);

// Required as a separate function for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new GrootTranslateHttpLoader(http, `${BASE_URL}/assets/i18n/`);
}

@NgModule({
  declarations: [
    AppComponent,
    DemoButtonsComponent,
    DemoTabsComponent,
    DemoLoadingComponent,
    DemoToasterComponent,
    DemoTableComponent,
    DemoFormComponent,
    DemoBoxComponent,
    DemoModalsComponent,
    DemoTooltipComponent,
    DemoColorsComponent,
    HomepageComponent,
    GettingStartedComponent,
    ExternalReferencesComponent,
    GrootStyleComponent,
    GettingHelpComponent,
    IconsComponent,
    IeSupportComponent,
    TranslationsGuideComponent,
    OtherUtilitiesComponent,
    DemoNavbarComponent,
    CallingTheServerComponent,
    ReleaseComponent,
    CapabilitiesComponent,
    DemoCompleteFormComponent,
    DemoPageTitleComponent,
    DemoFooterComponent,
    DemoCardsComponent,
    DemoTableAutocolComponent,
    DemoSmallComponentsComponent,
    DemoSidebarComponent,
    DemoBaseSearchFormComponent,
    DemoTestFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]},
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: GrootMissingTranslationLogger,
        deps: [ConsoleLoggingService]
      }
    }),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    GrootModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    AppRoutingModule,
    GrootTableAutocolModule,
    GrootCurrencyModule,
  ],
  providers: [
    {provide: BsDatepickerConfig, useFactory: grootConfigBsDatePicker},
    {provide: GrootCapabilityService, useClass: DemoCapabilityService},
    {provide: DEFAULT_LANGUAGE, useValue: 'en'},

    // Registers the groot plugin and initializes the architecture
    {provide: GROOT_PLUGIN, useClass: DocsArchGrootPlugin, multi: true},
    INIT_GROOT_ARCH_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
