import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextWtdComponent } from './text-wtd.component';

describe('TextWtdComponent', () => {
  let component: TextWtdComponent;
  let fixture: ComponentFixture<TextWtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextWtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
