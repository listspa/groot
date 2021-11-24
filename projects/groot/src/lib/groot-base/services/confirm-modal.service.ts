import {Injectable} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Observable, Subject} from 'rxjs';
import {ConfirmModalComponent} from '../components/confirm-modal/confirm-modal.component';
import {ClassesType} from '../model/classes-type.model';
import {filter, map} from 'rxjs/operators';
import {ConfirmModalNotesComponent} from '../components/confirm-modal-notes/confirm-modal-notes.component';

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
  footerCancelClasses?: ClassesType;
  footerConfirmClasses?: ClassesType;
}

export interface ConfirmationModalNotesParams extends ConfirmationModalParams {
  notesLabel: string;
  notesRequired: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  static readonly DEFAULT_PARAMS: Partial<ConfirmationModalParams> = {
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
  };

  static readonly DEFAULT_PARAMS_NOTES: Partial<ConfirmationModalNotesParams> = {
    ...ConfirmModalService.DEFAULT_PARAMS,
    notesLabel: 'common.notes',
    notesRequired: true,
  };


  constructor(private bsModalService: BsModalService) {
  }

  showConfirmation(params: ConfirmationModalParams)
    : Observable<boolean> {
    const actualParams = {
      ...ConfirmModalService.DEFAULT_PARAMS,
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


  confirmYesNoBoolean(params: ConfirmationModalParams): Observable<boolean> {
    const actualParams = {
      ...ConfirmModalService.DEFAULT_PARAMS,
      ...params
    };

    return this.showConfirmation(actualParams);
  }

  confirmYesNo(params: ConfirmationModalParams): Observable<void> {
    return this.confirmYesNoBoolean(params)
      .pipe(
        filter(v => Boolean(v)),
        map(() => {
          // Discard boolean
        })
      );
  }

  confirmYesNoNotes(params: ConfirmationModalNotesParams): Observable<string> {
    const actualParams = {
      ...ConfirmModalService.DEFAULT_PARAMS_NOTES,
      ...params
    };

    const resultSubject = new Subject<string>();
    this.bsModalService.show(ConfirmModalNotesComponent, {
      initialState: {
        ...actualParams,
        resultSubject
      },
    });

    return resultSubject;
  }
}
