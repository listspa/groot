import {Component, Input} from '@angular/core';
import {NbpuSchemaFieldType} from '../../nbpu.interfaces';

@Component({
  selector: 'groot-display-label-value',
  templateUrl: './display-label-value.component.html'
})
export class DisplayLabelValueComponent {
  @Input() label: string;
  @Input() separator?: string = null;
  @Input() translateValue = false;
  @Input() dataType: NbpuSchemaFieldType = NbpuSchemaFieldType.STRING;
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
}
