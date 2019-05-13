import { TestBed, inject } from '@angular/core/testing';

import { UsermoduleService } from './usermodule.service';

describe('UsermoduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsermoduleService]
    });
  });

  it('should be created', inject([UsermoduleService], (service: UsermoduleService) => {
    expect(service).toBeTruthy();
  }));
});
