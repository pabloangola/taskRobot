import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarVehiculosComponent } from './asociar-vehiculos.component';

describe('AsociarVehiculosComponent', () => {
  let component: AsociarVehiculosComponent;
  let fixture: ComponentFixture<AsociarVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsociarVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
