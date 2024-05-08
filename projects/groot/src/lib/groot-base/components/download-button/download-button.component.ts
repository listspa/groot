import {Component, ElementRef, Input, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as FileSaver from 'file-saver';
import {NotificationToastService} from '../../services/notification-toast.service';

@Component({
  selector: 'groot-download-button',
  templateUrl: './download-button.component.html'
})
export class DownloadButtonComponent {
  @Input() label = 'common.downloadExcel';
  @Input() icon: string[] = ['fa-regular', 'fa-file-excel'];
  @Input() labelArgs: any = {};
  @Input() url: string;
  @Input() urlProvider: () => string;
  @Input() args: object;
  @Input() argsProvider: () => object;
  @Input() method: 'GET' | 'POST' = 'POST';
  @Input() disabled = false;
  @Input() ajax = false;
  @Input() downloadFileName = 'download.xlsx';

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private http: HttpClient,
              private notificationToastService: NotificationToastService) {
  }

  onClick(): void {
    if (this.disabled) {
      return;
    }

    if (!this.ajax) {
      this.handleDownloadWithIFrameAndAutoSubmittingForm();
    } else {
      this.handleAjaxDownload();
    }
  }

  private handleDownloadWithIFrameAndAutoSubmittingForm() {
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
          const input = this.makeInput(key);
          input.value = JSON.stringify(v);
          form.appendChild(input);
        });
      } else if (value instanceof Object) {
        const input = this.makeInput(key);
        input.value = JSON.stringify(value);
        form.appendChild(input);
      } else {
        const input = this.makeInput(key);
        input.value = value;
        form.appendChild(input);
      }
    });
  }

  private makeInput(key) {
    const input = this.renderer.createElement('input');
    input.type = 'hidden';
    input.name = key;
    return input;
  }

  private submitForm(form) {
    this.renderer.appendChild(this.elementRef.nativeElement, form);
    form.submit();
    this.renderer.removeChild(this.elementRef.nativeElement, form);
  }

  private handleAjaxDownload() {
    this.getDownloadObservable()
      .subscribe(data => {
        FileSaver.saveAs(data, this.downloadFileName);
      }, response => this.notificationToastService.showGenericCannotDownloadNotification(response));
  }

  private getDownloadObservable() {
    if (this.method === 'POST') {
      return this.http.post<Blob>(this.getUrl(), this.getArgs(), {responseType: 'blob' as 'json'});
    } else {
      return this.http.get<Blob>(this.getUrl(), {params: this.getArgs() as any, responseType: 'blob' as 'json'});
    }
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
