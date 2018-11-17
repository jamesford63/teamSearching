import { TestBed, inject } from '@angular/core/testing';

import { NotificationTypeService } from './notification-type.service';


describe('NotificationTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationTypeService]
    });
  });

  it('should be created', inject([NotificationTypeService], (service: NotificationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
