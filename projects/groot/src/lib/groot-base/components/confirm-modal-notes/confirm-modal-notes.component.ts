import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ClassesType} from '../../model/classes-type.model';

@Component({
  selector: 'groot-confirm-modal-notes',
  templateUrl: './confirm-modal-notes.component.html',
})
export class ConfirmModalNotesComponent {
  text: string;
  titleArguments?: object | null;
  title: string;
  textArguments?: object | null;
  yesLabel: string;
  noLabel: string;
  resultSubject: Subject<string>;
  notesLabel: string;
  notesRequired: boolean;

  headerClasses: ClassesType = 'bg-primary';
  bodyClasses: ClassesType;
  footerClasses: ClassesType = 'buttons-list-bottom-right';
  footerCancelClasses: ClassesType = 'btn-outline-danger';
  footerConfirmClasses: ClassesType = 'btn-outline-success';

  notesText: string;

  constructor(private modalRef: BsModalRef) {
  }

  onCancel(): void {
    this.completeInteraction();
  }

  onConfirm(): void {
    this.resultSubject.next(this.notesText);
    this.completeInteraction();
  }

  private completeInteraction(): void {
    this.resultSubject.complete();
    this.modalRef.hide();
  }
}
