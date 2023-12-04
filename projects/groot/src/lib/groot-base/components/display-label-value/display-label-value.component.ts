import {Component, Input} from '@angular/core';
import {NbpuSchemaFieldType} from '../../utils/pagination.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {normalizeNgBootstrapDateFormat} from '../forms/groot-date-picker/groot-date-picker-config';

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
  @Input() doubleFormat = '0.2';
  @Input() dateFormat: string;
  @Input() hoursFormat = 'HH:mm';
  @Input() locale = 'en';
  @Input() horizontalLabel: boolean = false;

  constructor(bsDatepickerConfig: BsDatepickerConfig) {
    this.dateFormat = normalizeNgBootstrapDateFormat(bsDatepickerConfig.dateInputFormat);
  }
}
