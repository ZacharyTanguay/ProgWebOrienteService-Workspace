/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BandsintownService } from './bandsintown.service';

describe('Service: Bandsintown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BandsintownService]
    });
  });

  it('should ...', inject([BandsintownService], (service: BandsintownService) => {
    expect(service).toBeTruthy();
  }));
});
