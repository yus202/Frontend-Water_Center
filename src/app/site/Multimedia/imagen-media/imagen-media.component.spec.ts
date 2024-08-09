import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenMediaComponent } from './imagen-media.component';

describe('ImagenMediaComponent', () => {
  let component: ImagenMediaComponent;
  let fixture: ComponentFixture<ImagenMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
