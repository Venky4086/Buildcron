import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testdatalibrarylist2Component } from './testdatalibrarylist2.component';

describe('Testdatalibrarylist2Component', () => {
  let component: Testdatalibrarylist2Component;
  let fixture: ComponentFixture<Testdatalibrarylist2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Testdatalibrarylist2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Testdatalibrarylist2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
