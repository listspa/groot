import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Disables caches for GET requests. Needed to fix IE. :-/
 */
@Injectable()
export class NoCacheInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>,
            nextRequest: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET') {

      // no-cache related headers:
      // 1. Cache-Control         For HTTP 1.1. servers
      // 2. Pragma                Compatible with legacy HTTP 1.0 servers that do not support Cache-Control header
      // 3. Expires               Sets the expiry date as the unix epoch
      // 4. If-Modified-Since     Explicitly state that the request must comply with the given range

      const customRequest = request.clone({
        headers: request.headers
          .set('Cache-Control', 'no-cache')
          .set('Pragma', 'no-cache')
          .set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT')
          .set('If-Modified-Since', '0')
      });

      return nextRequest.handle(customRequest);
    }

    return nextRequest.handle(request);
  }
}
