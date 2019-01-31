import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GrootModule} from '../../../groot/src/lib/groot.module';
import {BsDatepickerModule, defineLocale, itLocale, TabsModule, TimepickerModule} from 'ngx-bootstrap';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {DemoButtonsComponent} from './demo-pages/demo-buttons/demo-buttons.component';
import {DemoTabsComponent} from './demo-pages/demo-tabs/demo-tabs.component';
import {DemoHomeComponent} from './demo-pages/demo-home/demo-home.component';
import {AppRoutingModule} from './app-routing.module';
import {DemoLoadingComponent} from './demo-pages/demo-loading/demo-loading.component';
import {DemoToasterComponent} from './demo-pages/demo-toaster/demo-toaster.component';
import {DemoTableComponent} from './demo-pages/demo-table/demo-table.component';
import {HttpClientModule} from '@angular/common/http';

// Enable italian locale
registerLocaleData(localeIt);
defineLocale('it', itLocale);

@NgModule({
  declarations: [
    AppComponent,
    DemoButtonsComponent,
    DemoTabsComponent,
    DemoHomeComponent,
    DemoLoadingComponent,
    DemoToasterComponent,
    DemoTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    TranslateModule.forRoot(),
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
