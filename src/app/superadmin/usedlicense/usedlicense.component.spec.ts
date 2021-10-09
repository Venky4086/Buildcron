import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedlicenseComponent } from './usedlicense.component';

describe('UsedlicenseComponent', () => {
  let component: UsedlicenseComponent;
  let fixture: ComponentFixture<UsedlicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsedlicenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
