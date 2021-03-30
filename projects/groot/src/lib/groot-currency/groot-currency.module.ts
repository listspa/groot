import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrootInputCurrencyComponent} from './components/groot-input-currency/groot-input-currency.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxCurrencyModule} from 'ngx-currency';
import {TranslateModule} from '@ngx-translate/core';
import {GrootModule} from '../groot-base/groot.module';


@NgModule({
  declarations: [GrootInputCurrencyComponent],
  imports: [
    CommonModule,
    NgxCurrencyModule,
    TranslateModule,
    FormsModule,
    GrootModule,
    ReactiveFormsModule,
  ],
  exports: [
    GrootInputCurrencyComponent,
  ]
})
export class GrootCurrencyModule {
}

// Remember to update public-abi.ts whenever you add a new angular object!
