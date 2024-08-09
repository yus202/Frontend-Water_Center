import { TestBed } from '@angular/core/testing';

import { PartnerOrganizationService } from './partner-organization.service';

describe('PartnerOrganizationService', () => {
  let service: PartnerOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
