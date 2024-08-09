import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuanacasteWatershedComponent } from './guanacaste-watershed.component';

describe('GuanacasteWatershedComponent', () => {
  let component: GuanacasteWatershedComponent;
  let fixture: ComponentFixture<GuanacasteWatershedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuanacasteWatershedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuanacasteWatershedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
