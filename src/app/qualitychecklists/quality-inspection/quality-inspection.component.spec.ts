import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityInspectionComponent } from './quality-inspection.component';

describe('QualityInspectionComponent', () => {
  let component: QualityInspectionComponent;
  let fixture: ComponentFixture<QualityInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
