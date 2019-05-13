import { TestBed, inject } from '@angular/core/testing';

import { FcmNotificationsService } from './fcm-notifications.service';

describe('FcmNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FcmNotificationsService]
    });
  });

  it('should be created', inject([FcmNotificationsService], (service: FcmNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
