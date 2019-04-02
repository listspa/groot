import {LoggingService} from './logging.service';
import {Injectable} from '@angular/core';

/**
 * Implementation of LogginsService that logs to the standard console.
 */
@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggingService implements LoggingService {
  // tslint:disable:no-console
  debug(message?: any, ...optionalParams: any[]): void {
    console.debug(message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]): void {
    console.info(message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]): void {
    console.warn(message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    console.error(message, ...optionalParams);
  }
}
