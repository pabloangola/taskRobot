import { Component, OnInit, EventEmitter } from '@angular/core';
import { Vehiculo } from '../dto/vehiculoResponse';
import { VehiculosService } from '../services/vehiculos.service';
import { ComparendoService } from '../services/comparendo.service';
import { Comparendo } from '../dto/comparendo';
import { ComparendoRequest } from '../dto/comparendoRequest';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-consultar-vehiculos',
  templateUrl: './consultar-vehiculos.component.html',
  styleUrls: ['./consultar-vehiculos.component.css']
})
export class ConsultarVehiculosComponent implements OnInit {

  constructor(private vehiculosService: VehiculosService, private comparendoService: ComparendoService) { }

  vehiculos: Vehiculo[] = [];
  comparendosVisibles:Comparendo[] = [];
  modalComparendo = new EventEmitter<string | MaterializeAction>();

  ngOnInit() {
    let body = {};

    this.vehiculosService.getVehiculo(body)
      .subscribe(res => {
        this.vehiculos = res;
        this.searchComparendo();
      });

  }
  openModal(index) {
    this.comparendosVisibles = this.vehiculos[index].comparendos;
    this.modalComparendo.emit({ action: "modal", params: ['open'] });
  }
  searchComparendo() {
    var comparendoRequest: ComparendoRequest = new ComparendoRequest();
    comparendoRequest.numero = "8909039388";
    comparendoRequest.tipo = 4;
    comparendoRequest.placas = [];
    this.vehiculos.forEach(element => {
      comparendoRequest.placas.push(element.placa);
    });

    this.comparendoService.getComparendo(comparendoRequest).subscribe(res => {
      res.forEach(comparendo => {
        this.vehiculos.forEach(vehiculo => {
          if (comparendo.placaVehiculo == vehiculo.placa) {
            if (vehiculo.comparendos == null) {
              vehiculo.comparendos = [];
            }
            vehiculo.comparendos.push(comparendo);
          }
        });
      });
    });
  }
}
