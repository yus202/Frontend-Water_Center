import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEventGroupsComponent } from './insert-event-groups.component';

describe('InsertEventGroupsComponent', () => {
  let component: InsertEventGroupsComponent;
  let fixture: ComponentFixture<InsertEventGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertEventGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEventGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
