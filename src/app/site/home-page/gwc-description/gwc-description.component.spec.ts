import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwcDescriptionComponent } from './gwc-description.component';

describe('GwcDescriptionComponent', () => {
  let component: GwcDescriptionComponent;
  let fixture: ComponentFixture<GwcDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwcDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwcDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
