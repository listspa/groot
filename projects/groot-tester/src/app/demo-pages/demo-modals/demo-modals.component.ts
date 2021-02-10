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
  modalHeaderClass: string;

  constructor(private modalService: BsModalService,
              private confirmModalService: ConfirmModalService) {
  }

  openPopup(template: TemplateRef<any>, modalClass: string, headerClass: string) {
    this.modalRef = this.modalService.show(template, {class: modalClass});
    this.modalHeaderClass = headerClass;
  }

  showConfirmationModal() {
    this.confirmModalService.showConfirmation({text: 'demoConfirmMessage'})
      .subscribe(value => this.confirmResult = value);
  }
}
