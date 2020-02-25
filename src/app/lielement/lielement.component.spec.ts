import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LielementComponent } from './lielement.component';

describe('LielementComponent', () => {
  let component: LielementComponent;
  let fixture: ComponentFixture<LielementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LielementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LielementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
