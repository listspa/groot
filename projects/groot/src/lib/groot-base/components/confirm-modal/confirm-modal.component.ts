import {Component} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {ClassesType} from '../../../model/classes-type.model';

@Component({
  selector: 'groot-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  text: string;
  titleArguments?: object | null;
  title: string;
  textArguments?: object | null;
  yesLabel: string;
  noLabel: string;
  resultSubject: Subject<boolean>;

  headerClasses: ClassesType = 'bg-primary';
  bodyClasses: ClassesType;
  footerClasses: ClassesType = 'buttons-list-bottom-right';
  footerCancelClasses: ClassesType = 'btn-outline-danger';
  footerConfirmClasses: ClassesType = 'btn-outline-success';

  constructor(private modalRef: BsModalRef) {
  }

  onCancel() {
    this.completeInteraction(false);
  }

  onConfirm() {
    this.completeInteraction(true);
  }

  private completeInteraction(value: boolean) {
    this.resultSubject.next(value);
    this.resultSubject.complete();
    this.modalRef.hide();
  }
}
