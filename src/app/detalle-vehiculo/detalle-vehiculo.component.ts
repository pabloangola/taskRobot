import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComparendoService } from '../services/comparendo.service';
import { Comparendo } from '../dto/comparendo';
import { ComparendoRequest } from '../dto/comparendoRequest';
import { Vehiculo } from '../dto/vehiculoResponse';
import { VehiculosService } from '../services/vehiculos.service';
import { DetallesImpuesto } from '../dto/impuesto';
import { ImpuestoService } from '../services/impuesto.service';

@Component({
  selector: 'app-detalle-vehiculo',
  templateUrl: './detalle-vehiculo.component.html',
  styleUrls: ['./detalle-vehiculo.component.css']
})
export class DetalleVehiculoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private comparendoService: ComparendoService,
    private ImpuestoService: ImpuestoService,
    private vehiculosService: VehiculosService,
    private router: Router) { }

  placa;
  comparendos: Comparendo[] = [];
  vehiculo: Vehiculo;
  totalAdeudado: number = 0;
  errorVehiculo: boolean = false;
  impuestos: DetallesImpuesto[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
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

      this.ImpuestoService.getImpuestos(this.placa).subscribe(res => {
        res.detalles.forEach(impuesto => {
          if(impuesto.indPago=="SIN PAGO"){
            this.impuestos.push(impuesto);
          }
        });
      });
    });
  }
  detalleNotificaciones(comparendo,tipo,placa) {
    this.router.navigate(['/detalle-notificacion', placa , tipo ,comparendo]);
  }
}