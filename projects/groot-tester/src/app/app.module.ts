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

// Enable italian locale
registerLocaleData(localeIt);
defineLocale('it', itLocale);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    TranslateModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot(),
    GrootModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
