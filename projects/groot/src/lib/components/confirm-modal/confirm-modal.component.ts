import {Component, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Subject} from 'rxjs';

@Component({
  selector: 'groot-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Input() yesLabel;
  @Input() noLabel;
  @Input() title;
  @Input() text;
  resultSubject: Subject<boolean>;

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
