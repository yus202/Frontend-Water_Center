import { TestBed } from '@angular/core/testing';

import { LidershipService } from './lidership.service';

describe('LidershipService', () => {
  let service: LidershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LidershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
