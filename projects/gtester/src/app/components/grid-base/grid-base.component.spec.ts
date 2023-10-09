import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBaseComponent } from './grid-base.component';

describe('GridBaseComponent', () => {
  let component: GridBaseComponent;
  let fixture: ComponentFixture<GridBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridBaseComponent]
    });
    fixture = TestBed.createComponent(GridBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
