import { TestBed } from '@angular/core/testing';

import { ClientAdmindashboardService } from './client-admindashboard.service';

describe('ClientAdmindashboardService', () => {
  let service: ClientAdmindashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAdmindashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
