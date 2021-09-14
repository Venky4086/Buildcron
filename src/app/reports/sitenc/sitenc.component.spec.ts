import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitencComponent } from './sitenc.component';

describe('SitencComponent', () => {
  let component: SitencComponent;
  let fixture: ComponentFixture<SitencComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitencComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitencComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
