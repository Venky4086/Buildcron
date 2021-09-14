import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperreportsComponent } from './superreports.component';

describe('SuperreportsComponent', () => {
  let component: SuperreportsComponent;
  let fixture: ComponentFixture<SuperreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
