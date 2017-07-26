import { TestBed, inject } from '@angular/core/testing';

import { PlantillaCorreoService } from './plantilla-correo.service';

describe('PlantillaCorreoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlantillaCorreoService]
    });
  });

  it('should be created', inject([PlantillaCorreoService], (service: PlantillaCorreoService) => {
    expect(service).toBeTruthy();
  }));
});
