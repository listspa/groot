import {Injectable} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {Observable, Subject} from 'rxjs';
import {ConfirmModalComponent} from '../components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  constructor(private bsModalService: BsModalService) {
  }

  showConfirmation(text: string,
                   title: string = 'common.pleaseConfirm',
                   yesLabel: string = 'common.confirm',
                   noLabel: string = 'common.cancel')
    : Observable<boolean> {
    const resultSubject = new Subject<boolean>();
    this.bsModalService.show(ConfirmModalComponent, {
      initialState: {
        text,
        title,
        yesLabel,
        noLabel,
        resultSubject
      }
    });
    return resultSubject;
  }
}
