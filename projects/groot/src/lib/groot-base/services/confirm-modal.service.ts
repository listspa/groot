import {Injectable} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {Observable, Subject} from 'rxjs';
import {ConfirmModalComponent} from '../components/confirm-modal/confirm-modal.component';
import {ClassesType} from '../../model/confirm-modal.model';

export interface ConfirmationModalParams {
  text: string;
  textArguments?: object | null;
  title?: string;
  titleArguments?: object | null;
  yesLabel?: string;
  noLabel?: string;

  headerClasses?: ClassesType;
  bodyClasses?: ClassesType;
  footerClasses?: ClassesType;
  footerCancelClasses?: ClassesType ;
  footerConfirmClasses?: ClassesType ;
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
      headerClasses: 'bg-primary',
      bodyClasses: '',
      footerClasses: 'buttons-list-bottom-right',
      footerCancelClasses: 'btn-outline-danger',
      footerConfirmClasses: 'btn-outline-success',
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
