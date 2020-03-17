import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSalePartComponent } from './for-sale-part.component';

describe('ForSalePartComponent', () => {
  let component: ForSalePartComponent;
  let fixture: ComponentFixture<ForSalePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForSalePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSalePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
