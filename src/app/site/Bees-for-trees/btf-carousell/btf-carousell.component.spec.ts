import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtfCarousellComponent } from './btf-carousell.component';

describe('BtfCarousellComponent', () => {
  let component: BtfCarousellComponent;
  let fixture: ComponentFixture<BtfCarousellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtfCarousellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtfCarousellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
