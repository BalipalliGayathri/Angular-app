import { TestBed, inject } from '@angular/core/testing';

import { NotificationStorageService } from './notification-storage.service';

describe('NotificationStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationStorageService]
    });
  });

  it('should be created', inject([NotificationStorageService], (service: NotificationStorageService) => {
    expect(service).toBeTruthy();
  }));
});
