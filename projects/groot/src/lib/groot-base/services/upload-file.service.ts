import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Generic service to manage the upload of a file and, additionally,
 * pass other parameters to the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private http: HttpClient) {
  }

  postFile(url: string, fileToUpload: File, fileParam: string = 'file', otherParams: object = {}): Observable<HttpEvent<any>> {
    const formData = UploadFileService.createFormData(fileToUpload, fileParam, otherParams);

    const request = new HttpRequest('POST', url, formData, {
      headers: new HttpHeaders({'enctype': 'multipart/form-data'}),
      reportProgress: true,
    });

    return this.http.request(request);
  }

  static createFormData(fileToUpload: File, fileParam: string, otherParams: object): FormData {
    const formData: FormData = new FormData();
    formData.append(fileParam, fileToUpload, fileToUpload.name);
    Object.keys(otherParams || {}).forEach(k => {
      formData.append(k, otherParams[k]);
    });
    return formData;
  }
}
