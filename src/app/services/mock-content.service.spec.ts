import { TestBed, inject } from '@angular/core/testing';

import { MockContentService } from './mock-content.service';

describe('MockContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockContentService]
    });
  });

  it('should be created', inject([MockContentService], (service: MockContentService) => {
    expect(service).toBeTruthy();
  }));
});
