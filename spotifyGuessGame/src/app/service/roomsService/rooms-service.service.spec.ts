import { TestBed, inject } from '@angular/core/testing';

import { RoomsServiceService } from './rooms-service.service';

describe('RoomsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomsServiceService]
    });
  });

  it('should be created', inject([RoomsServiceService], (service: RoomsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
