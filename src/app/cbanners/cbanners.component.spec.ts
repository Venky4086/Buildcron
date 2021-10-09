import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbannersComponent } from './cbanners.component';

describe('CbannersComponent', () => {
  let component: CbannersComponent;
  let fixture: ComponentFixture<CbannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
