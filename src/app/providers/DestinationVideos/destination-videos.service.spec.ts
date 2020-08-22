import { TestBed } from '@angular/core/testing';

import { DestinationVideosService } from './destination-videos.service';

describe('DestinationVideosService', () => {
  let service: DestinationVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
