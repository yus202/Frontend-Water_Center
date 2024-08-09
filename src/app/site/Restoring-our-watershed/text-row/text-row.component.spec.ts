import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextROWComponent } from './text-row.component';

describe('TextROWComponent', () => {
  let component: TextROWComponent;
  let fixture: ComponentFixture<TextROWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextROWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextROWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
