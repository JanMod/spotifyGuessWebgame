import { TestBed, inject } from '@angular/core/testing';

import { SpotifyRestService } from './spotify-rest.service';

describe('SpotifyRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyRestService]
    });
  });

  it('should be created', inject([SpotifyRestService], (service: SpotifyRestService) => {
    expect(service).toBeTruthy();
  }));
});
