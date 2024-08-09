import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOrganizationsComponent } from './partner-organizations.component';

describe('PartnerOrganizationsComponent', () => {
  let component: PartnerOrganizationsComponent;
  let fixture: ComponentFixture<PartnerOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
