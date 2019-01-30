import {TestBed} from '@angular/core/testing';

import {LoadingService} from './loading.service';

describe('LoadingService', () => {
  let loadingStatus: boolean | null;
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });

    loadingStatus = null;
    service = TestBed.get(LoadingService);
    service.loadingStatusChanged.subscribe(value => loadingStatus = value);
  });

  it('should not have emitted any values', () => {
    expect(loadingStatus).toBeNull();
  });

  it('should emit true on start loading', () => {
    service.startLoading();
    expect(loadingStatus).toBeTruthy();
  });

  it('should emit false on start and done loading', () => {
    service.startLoading();
    service.doneLoading();
    expect(loadingStatus).toBeFalsy();
  });

  it('should emit a done loading only when it has returned to zero', () => {
    service.startLoading();
    service.startLoading();
    service.doneLoading();
    expect(loadingStatus).toBeTruthy();

    service.doneLoading();
    expect(loadingStatus).toBeFalsy();
  });

  it('should throw an error when calls are mismatched', () => {
    expect(() => service.doneLoading()).toThrow();
  });
});
