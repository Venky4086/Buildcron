import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensecountComponent } from './licensecount.component';

describe('LicensecountComponent', () => {
  let component: LicensecountComponent;
  let fixture: ComponentFixture<LicensecountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensecountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
