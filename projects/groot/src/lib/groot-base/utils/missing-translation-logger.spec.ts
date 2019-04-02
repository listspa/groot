import {TestBed} from '@angular/core/testing';
import {MissingTranslationHandler, TranslateModule, TranslateService} from '@ngx-translate/core';
import {GrootMissingTranslationLogger} from './missing-translation-logger';
import {DebugLoggingService} from '../services/debug-logging.service';

describe('GrootMissingTranslationLogger', () => {
  let translate: TranslateService;
  let debugLoggingService: DebugLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebugLoggingService],
      imports: [TranslateModule.forRoot({
        missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: GrootMissingTranslationLogger,
          deps: [DebugLoggingService]
        }
      })]
    });
    translate = TestBed.get(TranslateService);
    debugLoggingService = TestBed.get(DebugLoggingService);
  });

  it('should report a translation', () => {
    translate.get('hello');

    expect(debugLoggingService.loggedMessages.length).toBe(1);
    expect(debugLoggingService.loggedMessages[0].level).toBe('warn');
    expect(debugLoggingService.loggedMessages[0].message).toBe('Translation not found: %o');
    expect(debugLoggingService.loggedMessages[0].params).toEqual(['hello']);
  });

  it('should report the same translations only once', () => {
    translate.get('hello');
    translate.get('hello');
    translate.get('hello');

    expect(debugLoggingService.loggedMessages.length).toBe(1);
  });
});
