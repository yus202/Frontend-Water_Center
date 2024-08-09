import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BftImagesComponent } from './bft-images.component';

describe('BftImagesComponent', () => {
  let component: BftImagesComponent;
  let fixture: ComponentFixture<BftImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BftImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BftImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
