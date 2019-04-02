import {DomainElement} from '../nbpu.interfaces';
import {forkJoin, Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';

export function translateLabels(translateService: TranslateService,
                                items: DomainElement[])
  : Observable<DomainElement[]> {
  return forkJoin(items.map(item => translateLabel(translateService, item)));
}

export function translateLabel(translateService: TranslateService,
                               item: DomainElement): Observable<DomainElement> {
  return translateService.get(item.label)
    .pipe(map(translation => ({value: item.value, label: translation})));
}

export function translateStrings(translateService: TranslateService,
                                 items: string[])
  : Observable<string[]> {
  return forkJoin(items.map(item => translateService.get(item)));
}
