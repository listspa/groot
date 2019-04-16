import {Component, Input} from '@angular/core';
import {NbpuSchemaFieldType} from '../../utils/pagination.model';

@Component({
  selector: 'groot-display-label-value',
  templateUrl: './display-label-value.component.html'
})
export class DisplayLabelValueComponent {
  @Input() label: string;
  @Input() separator?: string = null;
  @Input() translateValue = false;
  @Input() dataType: NbpuSchemaFieldType = NbpuSchemaFieldType.STRING;
  @Input() value: any[] | any;
  @Input() align = false;
}
