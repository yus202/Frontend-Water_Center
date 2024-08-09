import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdNavComponent } from './third-nav.component';

describe('ThirdNavComponent', () => {
  let component: ThirdNavComponent;
  let fixture: ComponentFixture<ThirdNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
