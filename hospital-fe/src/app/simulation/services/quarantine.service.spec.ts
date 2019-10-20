import { TestBed } from '@angular/core/testing';

import { QuarantineService } from './quarantine.service';

describe('QuarantineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuarantineService = TestBed.get(QuarantineService);
    expect(service).toBeTruthy();
  });
});
