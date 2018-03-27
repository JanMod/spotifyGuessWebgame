import { TestBed, inject } from '@angular/core/testing';

import { ResponseSnackbarService } from './response-snackbar.service';

describe('ResponseSnackbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseSnackbarService]
    });
  });

  it('should be created', inject([ResponseSnackbarService], (service: ResponseSnackbarService) => {
    expect(service).toBeTruthy();
  }));
});
