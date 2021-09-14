import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetylibrarylistComponent } from './safetylibrarylist.component';

describe('SafetylibrarylistComponent', () => {
  let component: SafetylibrarylistComponent;
  let fixture: ComponentFixture<SafetylibrarylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetylibrarylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetylibrarylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
