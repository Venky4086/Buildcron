import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupermaterialComponent } from './supermaterial.component';

describe('SupermaterialComponent', () => {
  let component: SupermaterialComponent;
  let fixture: ComponentFixture<SupermaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupermaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupermaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
