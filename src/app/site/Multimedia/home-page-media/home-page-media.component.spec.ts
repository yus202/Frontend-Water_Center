import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageMediaComponent } from './home-page-media.component';

describe('HomePageMediaComponent', () => {
  let component: HomePageMediaComponent;
  let fixture: ComponentFixture<HomePageMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
