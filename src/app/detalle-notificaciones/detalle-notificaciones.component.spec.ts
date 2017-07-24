import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNotificacionesComponent } from './detalle-notificaciones.component';

describe('DetalleNotificacionesComponent', () => {
  let component: DetalleNotificacionesComponent;
  let fixture: ComponentFixture<DetalleNotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleNotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
