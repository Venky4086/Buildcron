import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteinstructionComponent } from './siteinstruction.component';

describe('SiteinstructionComponent', () => {
  let component: SiteinstructionComponent;
  let fixture: ComponentFixture<SiteinstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteinstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteinstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
