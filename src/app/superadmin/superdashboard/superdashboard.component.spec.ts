import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperdashboardComponent } from './superdashboard.component';

describe('SuperdashboardComponent', () => {
  let component: SuperdashboardComponent;
  let fixture: ComponentFixture<SuperdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
