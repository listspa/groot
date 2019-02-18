import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GrootModule} from '../../../groot/src/lib/groot.module';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
  defineLocale,
  itLocale,
  ModalModule,
  TabsModule,
  TimepickerModule,
  TooltipModule
} from 'ngx-bootstrap';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {DemoButtonsComponent} from './demo-pages/demo-buttons/demo-buttons.component';
import {DemoTabsComponent} from './demo-pages/demo-tabs/demo-tabs.component';
import {DemoHomeComponent} from './demo-pages/demo-home/demo-home.component';
import {AppRoutingModule} from './app-routing.module';
import {DemoLoadingComponent} from './demo-pages/demo-loading/demo-loading.component';
import {DemoToasterComponent} from './demo-pages/demo-toaster/demo-toaster.component';
import {DemoTableComponent} from './demo-pages/demo-table/demo-table.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DemoFormComponent} from './demo-pages/demo-form/demo-form.component';
import {grootConfigBsDatePicker} from '../../../groot/src/lib/components/forms/groot-date-picker/groot-date-picker-config';
import {GrootMissingTranslationLogger} from '../../../groot/src/lib/utils/missing-translation-logger';
import {ConsoleLoggingService} from '../../../groot/src/lib/services/console-logging.service';
import {DemoBoxComponent} from './demo-pages/demo-box/demo-box.component';
import {DemoModalsComponent} from './demo-pages/demo-modals/demo-modals.component';
import {DemoTooltipComponent} from './demo-pages/demo-tooltip/demo-tooltip.component';
import {DemoColorsComponent} from './demo-pages/demo-colors/demo-colors.component';
import {BASE_URL} from './constants';
import {HomepageComponent} from './homepage/homepage.component';
import {GettingStartedComponent} from './docs/getting-started/getting-started.component';
import {ExternalReferencesComponent} from './docs/external-references/external-references.component';
import {GrootStyleComponent} from './docs/groot-style/groot-style.component';

// Enable italian locale
registerLocaleData(localeIt);
defineLocale('it', itLocale);

// Required as a separate function for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${BASE_URL}/assets/i18n/`);
}

@NgModule({
  declarations: [
    AppComponent,
    DemoButtonsComponent,
    DemoTabsComponent,
    DemoHomeComponent,
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
    GrootStyleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
    AppRoutingModule,
  ],
  providers: [
    {provide: BsDatepickerConfig, useFactory: grootConfigBsDatePicker}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
