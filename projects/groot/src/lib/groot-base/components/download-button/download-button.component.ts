import {Component, ElementRef, Input, Renderer2} from '@angular/core';

@Component({
  selector: 'groot-download-button',
  templateUrl: './download-button.component.html'
})
export class DownloadButtonComponent {
  @Input() label: string = 'common.downloadExcel';
  @Input() icon: string[] = ['fa', 'fa-file-excel-o'];
  @Input() labelArgs: any = {};
  @Input() url: string;
  @Input() urlProvider: () => string;
  @Input() args: object;
  @Input() argsProvider: () => object;
  @Input() method: 'GET' | 'POST' = 'POST';
  @Input() disabled = false;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  onClick(): void {
    if (this.disabled) {
      return;
    }

    const form = this.createForm();
    this.addArgs(form);
    this.submitForm(form);
  }

  private createForm() {
    const form = this.renderer.createElement('form');
    form.action = this.getUrl();
    form.method = this.method;
    form.target = '_blank';
    return form;
  }

  /**
   * Adds each property of the given object to the form, as an hidden input.
   * Handles arrays and objects (to json).
   */
  private addArgs(form) {
    const args = this.getArgs();
    Object.keys(args).forEach(key => {
      const value = args[key];
      if (value instanceof Array) {
        value.forEach(v => {
          let input = this.makeInput(key);
          input.value = JSON.stringify(v);
          form.appendChild(input);
        });
      } else if (value instanceof Object) {
        let input = this.makeInput(key);
        input.value = JSON.stringify(value);
        form.appendChild(input);
      } else {
        let input = this.makeInput(key);
        input.value = value;
        form.appendChild(input);
      }
    });
  }

  private makeInput(key) {
    let input = this.renderer.createElement('input');
    input.type = 'hidden';
    input.name = key;
    return input;
  }

  private submitForm(form) {
    this.renderer.appendChild(this.elementRef.nativeElement, form);
    form.submit();
    this.renderer.removeChild(this.elementRef.nativeElement, form);
  }

  private getUrl(): string {
    if (this.urlProvider) {
      return this.urlProvider();
    } else {
      return this.url;
    }
  }

  private getArgs(): object {
    if (this.argsProvider) {
      return this.argsProvider();
    } else if (this.args) {
      return this.args;
    } else {
      return {};
    }
  }
}
