import { TestBed } from '@angular/core/testing';

import { RefreshTokenGuard } from './refresh-token.guard';

describe('RefreshTokenGuard', () => {
  let guard: RefreshTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RefreshTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
