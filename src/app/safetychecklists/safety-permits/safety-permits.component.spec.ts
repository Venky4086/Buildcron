import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyPermitsComponent } from './safety-permits.component';

describe('SafetyPermitsComponent', () => {
  let component: SafetyPermitsComponent;
  let fixture: ComponentFixture<SafetyPermitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyPermitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyPermitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
