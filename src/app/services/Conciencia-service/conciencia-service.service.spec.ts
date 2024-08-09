import { TestBed } from '@angular/core/testing';

import { ConcienciaServiceService } from './conciencia-service.service';

describe('ConcienciaServiceService', () => {
  let service: ConcienciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcienciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
