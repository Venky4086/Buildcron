import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdatalibrarylistComponent } from './testdatalibrarylist.component';

describe('TestdatalibrarylistComponent', () => {
  let component: TestdatalibrarylistComponent;
  let fixture: ComponentFixture<TestdatalibrarylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestdatalibrarylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdatalibrarylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
