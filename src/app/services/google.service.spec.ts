/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleService } from './google.service';

describe('Service: Google', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleService]
    });
  });

  it('should ...', inject([GoogleService], (service: GoogleService) => {
    expect(service).toBeTruthy();
  }));
});
