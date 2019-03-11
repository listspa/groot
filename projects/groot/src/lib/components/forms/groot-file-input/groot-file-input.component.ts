import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-file-input',
  templateUrl: './groot-file-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ]
})
export class UploadFileComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() buttonText = 'common.browse';
  @Input() icon = 'fa fa-upload';
  @Input() multiple = false;
  touched = false;
  invalid = false;
  files: File | File[];
  text = '';
  onChange = (files: File | File[]) => null;
  onTouched = () => null;

  fileEvent($event) {
    this.touched = true;
    this.writeValue($event.target.files);
  }

  writeValue(files: FileList): void {
    this.mapFileListToFileOrArrayOfFiles(files);
    this.onChange(this.files);
  }

  private mapFileListToFileOrArrayOfFiles(files: FileList) {
    if (files && files.length > 0) {
      if (this.multiple) {
        this.files = [];
        for (let i = 0; i < files.length; ++i) {
          this.files.push(files.item(i));
        }
        this.text = this.files.map(f => f.name).join(', ');
      } else {
        this.files = files.item(0);
        this.text = this.files.name;
      }
      this.invalid = false;
    } else {
      this.files = this.multiple ? [] : null;
      this.text = '';
      this.invalid = true;
    }
  }

  registerOnChange(fn: (text: File | File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
