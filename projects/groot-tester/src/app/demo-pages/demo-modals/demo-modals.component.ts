import {Component, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ConfirmModalService} from '../../../../../groot/src/lib/groot-base/services/confirm-modal.service';

@Component({
  selector: 'app-demo-modals',
  templateUrl: './demo-modals.component.html',
})
export class DemoModalsComponent {
  modalRef: BsModalRef;
  confirmResult: null | boolean = null;

  constructor(private modalService: BsModalService,
              private confirmModalService: ConfirmModalService) {
  }

  openPopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  showConfirmationModal() {
    this.confirmModalService.showConfirmation({text: 'demoConfirmMessage'})
      .subscribe(value => this.confirmResult = value);
  }
}
