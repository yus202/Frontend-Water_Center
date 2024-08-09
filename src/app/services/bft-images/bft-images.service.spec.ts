import { TestBed } from '@angular/core/testing';

import { BftImagesService } from './bft-images.service';

describe('BftImagesService', () => {
  let service: BftImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BftImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
