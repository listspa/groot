import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';

@Component({
  selector: 'groot-file-input',
  templateUrl: './groot-file-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrootFileInputComponent),
      multi: true
    }
  ],
  styles: [`:host {
    display: block;
  }`],
})
export class GrootFileInputComponent implements ControlValueAccessor {
  @Output() clear = new EventEmitter<void>();
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
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

  @ViewChild('input') inputNgModel: NgModel;
  @ViewChild('fileInput') fileInput;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  fileEvent($event) {
    this.touched = true;
    this.writeValue($event.target.files);
    this.onChange(this.files);
  }

  writeValue(files: FileList | File | File[]): void {
    this.mapFileListToFileOrArrayOfFiles(GrootFileInputComponent.normalizeFileList(files));
    this.changeDetectorRef.detectChanges();
  }

  private static normalizeFileList(files: FileList | File | File[]): File | File[] {
    if (files instanceof FileList) {
      // Handle `FileList` by transforming it into an Array<File> for simplicity
      const filesArray = [];
      for (let i = 0; i < files.length; ++i) {
        filesArray.push(files.item(i));
      }
      return filesArray;
    } else {
      return files;
    }
  }

  private mapFileListToFileOrArrayOfFiles(files: File | File[]) {
    if (Array.isArray(files) && files.length > 0) {
      if (this.multiple) {
        this.files = [];
        for (let i = 0; i < files.length; ++i) {
          this.files.push(files[i]);
        }
        this.filled = this.files.length > 0;
        this.text = this.files.map(f => f.name).join(', ');
      } else {
        this.files = files[0];
        this.filled = true;
        this.text = this.files.name;
      }
      this.invalid = false;
    } else if (files instanceof File) {
      this.files = files;
      this.filled = true;
      this.text = this.files.name;
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
    this.fileInput.nativeElement.value = '';
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
