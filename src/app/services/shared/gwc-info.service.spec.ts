import { TestBed } from '@angular/core/testing';

import { GwcInfoService } from './gwc-info.service';

describe('GwcInfoService', () => {
  let service: GwcInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GwcInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
