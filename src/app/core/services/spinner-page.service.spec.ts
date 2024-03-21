import { TestBed } from '@angular/core/testing';

import { SpinnerPageService } from './spinner-page.service';

xdescribe('SpinnerPageService', () => {
  let service: SpinnerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
