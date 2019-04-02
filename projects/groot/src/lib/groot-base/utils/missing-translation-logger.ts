import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';
import {LoggingService} from '../services/logging.service';

/**
 * Logs to the console the translations that have not been found, once per translation.
 */
export class GrootMissingTranslationLogger implements MissingTranslationHandler {
  private reportedLabels = new Set<string>();

  constructor(private loggingService: LoggingService) {
  }

  handle(params: MissingTranslationHandlerParams): void {
    if (this.reportedLabels.has(params.key)) {
      return;
    }

    this.loggingService.warn('Translation not found: %o', params.key);
    this.reportedLabels.add(params.key);
  }
}
