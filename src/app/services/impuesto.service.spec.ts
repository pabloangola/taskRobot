import { TestBed, inject } from '@angular/core/testing';

import { ImpuestoService } from './impuesto.service';

describe('ImpuestoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImpuestoService]
    });
  });

  it('should be created', inject([ImpuestoService], (service: ImpuestoService) => {
    expect(service).toBeTruthy();
  }));
});
