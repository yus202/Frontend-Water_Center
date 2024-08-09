import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEventUnitComponent } from './insert-event-unit.component';

describe('InsertEventUnitComponent', () => {
  let component: InsertEventUnitComponent;
  let fixture: ComponentFixture<InsertEventUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertEventUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEventUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
