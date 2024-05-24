import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgxCurrencyConfig, NgxCurrencyInputMode} from 'ngx-currency';

@Injectable({
  providedIn: 'root'
})
export class GrootInputCurrencyService {
  // tslint:disable-next-line:variable-name
  private readonly _changeConfig: ReplaySubject<Partial<NgxCurrencyConfig>> = new ReplaySubject(1);

  constructor() {
  }

  public changeConfig(config: Partial<NgxCurrencyConfig>): void {
    this._changeConfig.next(config);
  }

  public changePreference(preference: { locale?: 'it' | 'en', numDecimals?: number, inputMode?: NgxCurrencyInputMode }): void {
    const {locale, numDecimals, inputMode} = preference;
    const config: Partial<NgxCurrencyConfig> = {};
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

  public onChangeConfig(): Observable<Partial<NgxCurrencyConfig>> {
    return this._changeConfig.pipe(
      map(
        conf => ({...conf})
      )
    );
  }
}
