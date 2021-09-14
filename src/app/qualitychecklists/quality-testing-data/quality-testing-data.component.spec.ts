import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityTestingDataComponent } from './quality-testing-data.component';

describe('QualityTestingDataComponent', () => {
  let component: QualityTestingDataComponent;
  let fixture: ComponentFixture<QualityTestingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityTestingDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityTestingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
