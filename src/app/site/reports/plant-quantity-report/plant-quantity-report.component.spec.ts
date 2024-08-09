import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantQuantityReportComponent } from './plant-quantity-report.component';

describe('PlantQuantityReportComponent', () => {
  let component: PlantQuantityReportComponent;
  let fixture: ComponentFixture<PlantQuantityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantQuantityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantQuantityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
