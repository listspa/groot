/**
 * Very simple logging service, a wrapper around the raw `console`.
 */
export interface LoggingService {
  debug(message?: any, ...optionalParams: any[]): void;

  info(message?: any, ...optionalParams: any[]): void;

  warn(message?: any, ...optionalParams: any[]): void;

  error(message?: any, ...optionalParams: any[]): void;
}
