import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionordersComponent } from './subscriptionorders.component';

describe('SubscriptionordersComponent', () => {
  let component: SubscriptionordersComponent;
  let fixture: ComponentFixture<SubscriptionordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
