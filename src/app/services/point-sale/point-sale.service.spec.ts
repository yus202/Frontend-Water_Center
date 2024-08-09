import { TestBed } from '@angular/core/testing';

import { PointSaleService } from './point-sale.service';

describe('PointSaleService', () => {
  let service: PointSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
