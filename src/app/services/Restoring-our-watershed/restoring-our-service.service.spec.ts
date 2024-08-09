import { TestBed } from '@angular/core/testing';

import { RestoringOurServiceService } from './restoring-our-service.service';

describe('RestoringOurServiceService', () => {
  let service: RestoringOurServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestoringOurServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
