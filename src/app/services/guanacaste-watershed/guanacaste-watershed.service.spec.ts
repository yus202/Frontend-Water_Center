import { TestBed } from '@angular/core/testing';

import { GuanacasteWatershedService } from './guanacaste-watershed.service';

describe('GuanacasteWatershedService', () => {
  let service: GuanacasteWatershedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuanacasteWatershedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
