import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoConcienciaAComponent } from './texto-conciencia-a.component';

describe('TextoConcienciaAComponent', () => {
  let component: TextoConcienciaAComponent;
  let fixture: ComponentFixture<TextoConcienciaAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoConcienciaAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoConcienciaAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
