import { Component, OnInit, EventEmitter } from '@angular/core';
import { Vehiculo, Usuario } from '../dto/vehiculoResponse';
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
  usuarioVisible: Usuario = new Usuario();
  totalPonderado: number = 0;
  totalComparendos: number = 0;
  totalDeRegistros: number = 0;
  pagina: number = 1;

  ngOnInit() {
    let body = {};

    this.vehiculosService.getVehiculo(body)
      .subscribe(res => {
        this.vehiculos = res;
        this.searchComparendo();
      });
  }
  detalleVehiculo(placa) {
    this.router.navigate(['/detalle-vehiculo',placa]);
  }
  showUserModal(index) {
    this.usuarioVisible = this.vehiculos[index].usuario;

  }
  searchComparendo() {
    var comparendoRequest: ComparendoRequest = new ComparendoRequest();
    comparendoRequest.numero = "8909039388";
    comparendoRequest.tipo = 4;

    this.comparendoService.getComparendo(comparendoRequest).subscribe(res => {
      res.forEach(comparendo => {
        var existePropietario: boolean = false;
        this.vehiculos.forEach(vehiculo => {
          if (comparendo.placaVehiculo == vehiculo.placa) {
            existePropietario = true;
            if (vehiculo.comparendos == null) {
              vehiculo.comparendos = [];
            }
            vehiculo.comparendos.push(comparendo);
          }
        });
        if (!existePropietario) {
          var vehiculoNoVinculado: Vehiculo = new Vehiculo();
          vehiculoNoVinculado.placa = comparendo.placaVehiculo;
          vehiculoNoVinculado.comparendos = [];
          vehiculoNoVinculado.comparendos.push(comparendo);
          this.vehiculos.push(vehiculoNoVinculado);
        }
        this.totalComparendos++;
        this.totalPonderado += comparendo.total;
      });
      var index: number = 0;
      this.vehiculos.forEach(vehiculo => {
        if (vehiculo.comparendos == null) {
          this.vehiculos.splice(index, 1);
        }
        index++;
      });
      this.totalDeRegistros = this.vehiculos.length;
    });
  }
}
