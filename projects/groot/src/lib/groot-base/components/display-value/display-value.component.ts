import {Component, Input} from '@angular/core';
import {NbpuSchemaFieldType} from '../../utils/pagination.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {normalizeNgBootstrapDateFormat} from '../forms/groot-date-picker/groot-date-picker-config';

@Component({
  selector: 'groot-display-value',
  templateUrl: './display-value.component.html'
})
export class DisplayValueComponent {
  @Input() separator?: string = null;
  @Input() translateValue = false;
  @Input() dataType: NbpuSchemaFieldType = NbpuSchemaFieldType.STRING;
  @Input() align = false;
  @Input() doubleFormat = '0.2';
  @Input() dateFormat: string;
  @Input() hoursFormat = 'HH:mm';
  @Input() locale = 'en';
  NbpuSchemaFieldType = NbpuSchemaFieldType;

  private _value: any[] | any;
  displayValue: any;

  @Input() set value(value: any[] | any) {
    this._value = value;

    if (Array.isArray(value)) {
      this.displayValue = value
        .filter(el => el !== null && el !== undefined)
        .join(this.separator);
    } else {
      this.displayValue = value;
    }
  }

  get value(): any[] | any {
    return this._value;
  }

  constructor(bsDatepickerConfig: BsDatepickerConfig) {
    this.dateFormat = normalizeNgBootstrapDateFormat(bsDatepickerConfig.dateInputFormat);
  }
}
