import {Component} from '@angular/core';
import {NbpuSchemaFieldType} from '../../../../../groot/src/lib/groot-base/utils/pagination.model';

@Component({
  selector: 'app-demo-small-components',
  templateUrl: './demo-small-components.component.html',
})
export class DemoSmallComponentsComponent {
  NbpuSchemaFieldType = NbpuSchemaFieldType;
  now = new Date();

  onClickActionProva() {
    alert('test test');
  }

  onActionToggle(opened: boolean) {
    console.log('toggled action buttons: open = ', opened);
  }
}
