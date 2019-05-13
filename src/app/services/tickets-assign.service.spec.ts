import { TestBed, inject } from '@angular/core/testing';

import { TicketsAssignService } from './tickets-assign.service';

describe('TicketsAssignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketsAssignService]
    });
  });

  it('should be created', inject([TicketsAssignService], (service: TicketsAssignService) => {
    expect(service).toBeTruthy();
  }));
});
