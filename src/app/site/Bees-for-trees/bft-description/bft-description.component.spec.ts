import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BftDescriptionComponent } from './bft-description.component';

describe('BftDescriptionComponent', () => {
  let component: BftDescriptionComponent;
  let fixture: ComponentFixture<BftDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BftDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BftDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
