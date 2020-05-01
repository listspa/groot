import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'groot-file-input',
  templateUrl: './groot-file-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootFileInputComponent),
      multi: true
    }
  ]
})
export class GrootFileInputComponent implements ControlValueAccessor {
  @Output() clear = new EventEmitter<void>();
  @Input() label: string;
  @Input() placeholder: string | null;
  @Input() name: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() buttonText = 'common.browse';
  @Input() icon = 'fa fa-upload';
  @Input() multiple = false;
  @Input() showClear = true;
  @Input() hidePlaceholder = false;
  touched = false;
  invalid = false;
  files: File | File[];
  text = '';
  filesNgModel: any;
  filled = false;
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
        this.filled = this.files.length > 0;
        this.text = this.files.map(f => f.name).join(', ');
      } else {
        this.files = files.item(0);
        this.filled = true;
        this.text = this.files.name;
      }
      this.invalid = false;
    } else {
      this.clearFiles();
    }
  }

  private clearFiles() {
    this.files = this.multiple ? [] : null;
    this.text = '';
    this.filled = false;
    this.invalid = true;
  }

  clearClicked(event: MouseEvent) {
    event.stopPropagation();
    this.touched = true;
    this.clearFiles();
    this.onChange(this.files);
    this.clear.next();
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
