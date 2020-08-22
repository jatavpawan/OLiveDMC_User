import { TestBed } from '@angular/core/testing';

import { NewdestinationInWhatsnewService } from './newdestination-in-whatsnew.service';

describe('NewdestinationInWhatsnewService', () => {
  let service: NewdestinationInWhatsnewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewdestinationInWhatsnewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
