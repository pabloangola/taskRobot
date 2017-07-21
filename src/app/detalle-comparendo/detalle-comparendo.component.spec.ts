import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComparendoComponent } from './detalle-comparendo.component';

describe('DetalleComparendoComponent', () => {
  let component: DetalleComparendoComponent;
  let fixture: ComponentFixture<DetalleComparendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleComparendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleComparendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
