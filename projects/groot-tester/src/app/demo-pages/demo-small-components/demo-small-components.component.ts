import {Component} from '@angular/core';
import {NbpuSchemaFieldType} from 'projects/groot/src/lib/groot-base/nbpu.interfaces';

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
}
