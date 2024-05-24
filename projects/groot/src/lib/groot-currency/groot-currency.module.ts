import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrootInputCurrencyComponent} from './components/groot-input-currency/groot-input-currency.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {GrootModule} from '../groot-base/groot.module';
import {GrootInputCurrencyService} from './services/groot-input-currency.service';
import {NgxCurrencyDirective} from 'ngx-currency';


@NgModule({
  declarations: [GrootInputCurrencyComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    GrootModule,
    ReactiveFormsModule,
    NgxCurrencyDirective,
  ],
  exports: [
    GrootInputCurrencyComponent,
  ]
})
export class GrootCurrencyModule {
  static forRoot(): ModuleWithProviders<GrootCurrencyModule>{
    return {
      ngModule: GrootCurrencyModule,
      providers: [
        GrootInputCurrencyService
      ]
    };
  }
}

// Remember to update public-api.ts whenever you add a new angular object!
