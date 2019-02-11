import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GrootModule} from '../../../groot/src/lib/groot.module';
import {BsDatepickerModule, defineLocale, itLocale, TabsModule, TimepickerModule} from 'ngx-bootstrap';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
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
import { DemoFormComponent } from './demo-pages/demo-form/demo-form.component';

// Enable italian locale
registerLocaleData(localeIt);
defineLocale('it', itLocale);

// Required as a separate function for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
    DemoFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}
    }),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot(),
    GrootModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
