import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetydashboardComponent } from './safetydashboard.component';

describe('SafetydashboardComponent', () => {
  let component: SafetydashboardComponent;
  let fixture: ComponentFixture<SafetydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetydashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
