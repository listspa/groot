import {LoggingService} from './logging.service';
import {Injectable} from '@angular/core';

export interface DebugLogMessage {
  level: string;
  message: any;
  params: any[];
}

/**
 * A simple implementation of `LoggingService` suitable for unit tests.
 * Simply stores the logged messages in a public-accessible array.
 */
@Injectable()
export class DebugLoggingService implements LoggingService {
  loggedMessages: DebugLogMessage[] = [];

  debug(message?: any, ...optionalParams: any[]): void {
    this.loggedMessages.push({level: 'debug', message, params: optionalParams});
  }

  info(message?: any, ...optionalParams: any[]): void {
    this.loggedMessages.push({level: 'info', message, params: optionalParams});
  }

  warn(message?: any, ...optionalParams: any[]): void {
    this.loggedMessages.push({level: 'warn', message, params: optionalParams});
  }

  error(message?: any, ...optionalParams: any[]): void {
    this.loggedMessages.push({level: 'error', message, params: optionalParams});
  }
}
