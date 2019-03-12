import {Component, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ConfirmModalService} from '../../../../../groot/src/lib/services/confirm-modal.service';

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
    this.confirmModalService.showConfirmation('example confirmation', 'titolo')
      .subscribe(value => this.confirmResult = value);
  }
}
