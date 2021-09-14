import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitychecklistsComponent } from './qualitychecklists.component';

describe('QualitychecklistsComponent', () => {
  let component: QualitychecklistsComponent;
  let fixture: ComponentFixture<QualitychecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitychecklistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitychecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
