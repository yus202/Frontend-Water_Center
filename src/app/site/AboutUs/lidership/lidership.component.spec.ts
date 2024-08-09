import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LidershipComponent } from './lidership.component';

describe('LidershipComponent', () => {
  let component: LidershipComponent;
  let fixture: ComponentFixture<LidershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LidershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LidershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
