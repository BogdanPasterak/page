import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeandcarComponent } from './homeandcar.component';

describe('HomeandcarComponent', () => {
  let component: HomeandcarComponent;
  let fixture: ComponentFixture<HomeandcarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeandcarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeandcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
