import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarVehiculosComponent } from './consultar-vehiculos.component';

describe('ConsultarVehiculosComponent', () => {
  let component: ConsultarVehiculosComponent;
  let fixture: ComponentFixture<ConsultarVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
