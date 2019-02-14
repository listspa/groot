import {Component, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-demo-modals',
  templateUrl: './demo-modals.component.html',
})
export class DemoModalsComponent {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  openPopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
