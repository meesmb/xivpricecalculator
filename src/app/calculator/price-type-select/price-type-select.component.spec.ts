import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTypeSelectComponent } from './price-type-select.component';

describe('PriceTypeSelectComponent', () => {
  let component: PriceTypeSelectComponent;
  let fixture: ComponentFixture<PriceTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceTypeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
