import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetychecklistsComponent } from './safetychecklists.component';

describe('SafetychecklistsComponent', () => {
  let component: SafetychecklistsComponent;
  let fixture: ComponentFixture<SafetychecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetychecklistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetychecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
