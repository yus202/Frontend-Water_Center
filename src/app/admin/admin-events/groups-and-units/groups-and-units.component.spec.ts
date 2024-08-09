import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAndUnitsComponent } from './groups-and-units.component';

describe('GroupsAndUnitsComponent', () => {
  let component: GroupsAndUnitsComponent;
  let fixture: ComponentFixture<GroupsAndUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsAndUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsAndUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
