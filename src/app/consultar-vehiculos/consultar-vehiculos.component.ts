import { Component, OnInit, EventEmitter } from '@angular/core';
import { Vehiculo } from '../dto/vehiculoResponse';
import { VehiculosService } from '../services/vehiculos.service';
import { ComparendoService } from '../services/comparendo.service';
import { Comparendo } from '../dto/comparendo';
import { ComparendoRequest } from '../dto/comparendoRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-vehiculos',
  templateUrl: './consultar-vehiculos.component.html',
  styleUrls: ['./consultar-vehiculos.component.css']
})
export class ConsultarVehiculosComponent implements OnInit {

  constructor(private vehiculosService: VehiculosService, private comparendoService: ComparendoService, private router: Router) { }

  vehiculos: Vehiculo[] = [];
  comparendosVisibles: Comparendo[] = [];
  totalPonderado: number = 0;
  totalComparendos: number = 0;
  pagina: number = 1;
  filtro: string;
  vehiculosTotales: Vehiculo[] = [];

  ngOnInit() {
    let body = {};

    this.vehiculosService.getVehiculo(body)
      .subscribe(res => {
        this.vehiculos = res;
        this.searchComparendo();
      });
  }
  detalleVehiculo(placa) {
    this.router.navigate(['/detalle-vehiculo', placa]);
  }
  searchComparendo() {
    var comparendoRequest: ComparendoRequest = new ComparendoRequest();
    comparendoRequest.numero = "8909039388";
    comparendoRequest.tipo = 4;
    comparendoRequest.placas = [];

    this.comparendoService.getComparendo(comparendoRequest).subscribe(res => {
      res.forEach(comparendo => {
        var existePropietario: boolean = false;
        this.vehiculos.forEach(vehiculo => {
          if (comparendo.placaVehiculo == vehiculo.licensePlate) {
            existePropietario = true;
            if (vehiculo.taxes == null) {
              vehiculo.taxes = [];
            }
            vehiculo.taxes.push(comparendo);
          }
        });
        if (!existePropietario) {
          var vehiculoNoVinculado: Vehiculo = new Vehiculo();
          vehiculoNoVinculado.licensePlate = comparendo.placaVehiculo;
          vehiculoNoVinculado.taxes = [];
          vehiculoNoVinculado.taxes.push(comparendo);
          this.vehiculos.push(vehiculoNoVinculado);
        }
        this.totalComparendos++;
        this.totalPonderado += comparendo.total;
      });
      var index: number = 0;
      this.vehiculos.forEach(vehiculo => {
        if (vehiculo.taxes == null) {
          this.vehiculos.splice(index, 1);
        }
        index++;
      });
      this.vehiculosTotales.push.apply(this.vehiculosTotales, this.vehiculos);
    });
  }

  filtrarTabla() {
    this.vehiculos = [];
    this.vehiculosTotales.forEach(vehiculo => {
      if (vehiculo.licensePlate.indexOf(this.filtro.toUpperCase()) >= 0) {
        this.vehiculos.push(vehiculo);
      }
    });
  }
}
