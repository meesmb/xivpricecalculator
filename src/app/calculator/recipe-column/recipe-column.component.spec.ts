import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeColumnComponent } from './recipe-column.component';

describe('RecipeColumnComponent', () => {
  let component: RecipeColumnComponent;
  let fixture: ComponentFixture<RecipeColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
