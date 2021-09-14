import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteregisterComponent } from './websiteregister.component';

describe('WebsiteregisterComponent', () => {
  let component: WebsiteregisterComponent;
  let fixture: ComponentFixture<WebsiteregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
