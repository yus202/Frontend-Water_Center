import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvetnsDashboardComponent } from './evetns-dashboard.component';

describe('EvetnsDashboardComponent', () => {
  let component: EvetnsDashboardComponent;
  let fixture: ComponentFixture<EvetnsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvetnsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvetnsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
