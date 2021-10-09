import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfaqsComponent } from './cfaqs.component';

describe('CfaqsComponent', () => {
  let component: CfaqsComponent;
  let fixture: ComponentFixture<CfaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfaqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
