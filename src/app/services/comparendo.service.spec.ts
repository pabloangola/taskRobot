import { TestBed, inject } from '@angular/core/testing';

import { ComparendoService } from './comparendo.service';

describe('ComparendoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComparendoService]
    });
  });

  it('should be created', inject([ComparendoService], (service: ComparendoService) => {
    expect(service).toBeTruthy();
  }));
});
