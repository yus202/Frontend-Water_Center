import { TestBed } from '@angular/core/testing';

import { BoardDirectorService } from './board-director.service';

describe('BoardDirectorService', () => {
  let service: BoardDirectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardDirectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
