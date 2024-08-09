import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BftAffiliatesComponent } from './bft-affiliates.component';

describe('BftAffiliatesComponent', () => {
  let component: BftAffiliatesComponent;
  let fixture: ComponentFixture<BftAffiliatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BftAffiliatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BftAffiliatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
