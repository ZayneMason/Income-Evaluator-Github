import { TestBed } from '@angular/core/testing';

import { TaxdataService } from './taxdata.service';

describe('TaxdataService', () => {
  let service: TaxdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
