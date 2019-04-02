import {Injectable} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {Observable, Subject} from 'rxjs';
import {ConfirmModalComponent} from '../components/confirm-modal/confirm-modal.component';

export interface ConfirmationModalParams {
  text: string;
  textArguments?: object | null;
  title?: string;
  titleArguments?: object | null;
  yesLabel?: string;
  noLabel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  constructor(private bsModalService: BsModalService) {
  }

  showConfirmation(params: ConfirmationModalParams)
    : Observable<boolean> {
    const actualParams = {
      textArguments: null,
      title: 'common.pleaseConfirm',
      titleArguments: null,
      yesLabel: 'common.confirm',
      noLabel: 'common.cancel',
      ...params
    };

    const resultSubject = new Subject<boolean>();
    this.bsModalService.show(ConfirmModalComponent, {
      initialState: {
        ...actualParams,
        resultSubject
      }
    });
    return resultSubject;
  }
}
