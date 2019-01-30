import { TestBed } from '@angular/core/testing';

import { GrootService } from './groot.service';

describe('GrootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrootService = TestBed.get(GrootService);
    expect(service).toBeTruthy();
  });
});
