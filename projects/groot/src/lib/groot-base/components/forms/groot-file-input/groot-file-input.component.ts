import {ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output, Self, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {GrootBaseInput} from '../groot-base-input';

@Component({
  selector: 'groot-file-input',
  templateUrl: './groot-file-input.component.html',
  styles: [`:host {
    display: block;
  }`],
})
export class GrootFileInputComponent extends GrootBaseInput {
  @Output() clear = new EventEmitter<void>();
  @Input() label: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() name: string;
  @Input() disabled = false;
  @Input() buttonText = 'common.browse';
  @Input() icon = 'fa-solid fa-upload';
  @Input() multiple = false;
  @Input() showClear = true;
  @Input() hidePlaceholder = false;
  @Input() horizontalLabel: boolean = false;
  touched = false;
  invalid = false;
  files: File | File[];
  text = '';
  filesNgModel: any;
  filled = false;
  onChange = (files: File | File[]) => null;
  onTouched = () => null;
  @ViewChild('fileInput') fileInput;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              @Self() @Optional() public control: NgControl) {
    super(control);
  }

  fileEvent($event): void {
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

  private mapFileListToFileOrArrayOfFiles(files: File | File[]): void {
    if (Array.isArray(files) && files.length > 0) {
      if (this.multiple) {
        this.files = [];
        for (const item of files) {
          this.files.push(item);
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

  private clearFiles(): void {
    this.files = this.multiple ? [] : null;
    this.text = '';
    this.filled = false;
    this.invalid = true;
  }

  clearClicked(event: MouseEvent): void {
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
