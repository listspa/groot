import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {CurrencyMaskConfig, CurrencyMaskInputMode} from 'ngx-currency';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrootInputCurrencyService {
  private readonly _changeConfig: ReplaySubject<Partial<CurrencyMaskConfig>> = new ReplaySubject(1);

  constructor() {
  }

  public changeConfig(config: Partial<CurrencyMaskConfig>) {
    this._changeConfig.next(config);
  }

  public changePreference(preference: { locale?: 'it' | 'en', numDecimals?: number, inputMode?: CurrencyMaskInputMode }) {
    const {locale, numDecimals, inputMode} = preference;
    const config: Partial<CurrencyMaskConfig> = {};
    if (locale === 'it') {
      config.decimal = ',';
      config.thousands = '.';
    }

    if (locale === 'en') {
      config.decimal = '.';
      config.thousands = ',';
    }
    config.precision = numDecimals;
    config.inputMode = inputMode;

    this.changeConfig(config);
  }

  public onChangeConfig(): Observable<Partial<CurrencyMaskConfig>> {
    return this._changeConfig.pipe(
      map(
        conf => ({...conf})
      )
    );
  }
}
