import { TestBed, inject } from '@angular/core/testing';

import { DetalleInfraccionesService } from './detalle-infracciones.service';

describe('DetalleInfraccionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalleInfraccionesService]
    });
  });

  it('should be created', inject([DetalleInfraccionesService], (service: DetalleInfraccionesService) => {
    expect(service).toBeTruthy();
  }));
});
