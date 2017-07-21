import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVehiculoComponent } from './agregar-vehiculo.component';

describe('AgregarVehiculoComponent', () => {
  let component: AgregarVehiculoComponent;
  let fixture: ComponentFixture<AgregarVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
