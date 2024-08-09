import { TestBed } from '@angular/core/testing';

import { BeesForTreesService } from './bees-for-trees.service';

describe('BeesForTreesService', () => {
  let service: BeesForTreesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeesForTreesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
