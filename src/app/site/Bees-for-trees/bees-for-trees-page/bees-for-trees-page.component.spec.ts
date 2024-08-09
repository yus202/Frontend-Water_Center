import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeesForTreesPageComponent } from './bees-for-trees-page.component';

describe('BeesForTreesPageComponent', () => {
  let component: BeesForTreesPageComponent;
  let fixture: ComponentFixture<BeesForTreesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeesForTreesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeesForTreesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
