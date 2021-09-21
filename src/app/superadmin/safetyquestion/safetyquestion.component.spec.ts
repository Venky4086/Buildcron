import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyquestionComponent } from './safetyquestion.component';

describe('SafetyquestionComponent', () => {
  let component: SafetyquestionComponent;
  let fixture: ComponentFixture<SafetyquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyquestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
