/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotifyHttpService } from './spotify.service';

describe('Service: Http', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyHttpService]
    });
  });

  it('should ...', inject([SpotifyHttpService], (service: SpotifyHttpService) => {
    expect(service).toBeTruthy();
  }));
});
