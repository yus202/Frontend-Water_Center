import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoringOurWatershedComponent } from './restoring-our-watershed.component';

describe('RestoringOurWatershedComponent', () => {
  let component: RestoringOurWatershedComponent;
  let fixture: ComponentFixture<RestoringOurWatershedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoringOurWatershedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoringOurWatershedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
