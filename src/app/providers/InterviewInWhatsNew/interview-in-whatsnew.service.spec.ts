import { TestBed } from '@angular/core/testing';

import { InterviewInWhatsnewService } from './interview-in-whatsnew.service';

describe('InterviewInWhatsnewService', () => {
  let service: InterviewInWhatsnewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewInWhatsnewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
