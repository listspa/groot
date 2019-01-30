import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GrootModule} from '../../../groot/src/lib/groot.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GrootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
