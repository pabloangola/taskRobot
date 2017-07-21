import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComparendoService } from '../services/comparendo.service';
import { Comparendo } from '../dto/comparendo';
import { ComparendoRequest } from '../dto/comparendoRequest';
import { Vehiculo } from '../dto/vehiculoResponse';
import { VehiculosService } from '../services/vehiculos.service';

@Component({
  selector: 'app-detalle-vehiculo',
  templateUrl: './detalle-vehiculo.component.html',
  styleUrls: ['./detalle-vehiculo.component.css']
})
export class DetalleVehiculoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private comparendoService: ComparendoService,
    private vehiculosService: VehiculosService) { }

  placa;
  comparendos: Comparendo[] = [];
  vehiculo: Vehiculo;
  totalAdeudado: number = 0;
  errorVehiculo:boolean = false;

  ngOnInit() {
    var sub = this.route.params.subscribe(params => {
      this.placa = params['placa'];
      var comparendoRequest: ComparendoRequest = new ComparendoRequest();
      comparendoRequest.numero = "8909039388";
      comparendoRequest.tipo = 4;
      comparendoRequest.placas = [];
      comparendoRequest.placas.push(this.placa);

      this.vehiculosService.detalleVehiculo(this.placa).subscribe(res => {
        this.vehiculo = res;
      },
        error => {
          this.errorVehiculo = true;
        });

      this.comparendoService.getComparendo(comparendoRequest).subscribe(res => {
        this.comparendos = res;
        res.forEach(comaprendo => {
          this.totalAdeudado += comaprendo.total;
        });
      });

      this
    });
  }
}