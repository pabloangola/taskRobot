import { Component, OnInit, EventEmitter } from '@angular/core';
import { Vehiculo } from '../dto/vehiculoResponse';
import { VehiculosService } from '../services/vehiculos.service';
import { ComparendoService } from '../services/comparendo.service';
import { Comparendo } from '../dto/comparendo';
import { ComparendoRequest } from '../dto/comparendoRequest';
import { Router } from '@angular/router';
import { EmailRequest } from '../dto/emailRequest';
import { TelefonoService } from '../services/telefono.service';
import { EmailService } from '../services/email.service';
import { SmsRequest } from '../dto/smsRequest';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Impuesto, DetallesImpuesto } from '../dto/impuesto';
import { ImpuestoService } from '../services/impuesto.service';

@Component({
  selector: 'app-consultar-vehiculos',
  templateUrl: './consultar-vehiculos.component.html',
  styleUrls: ['./consultar-vehiculos.component.css']
})
export class ConsultarVehiculosComponent implements OnInit {

  constructor(private vehiculosService: VehiculosService,
    private comparendoService: ComparendoService,
    private router: Router,
    private emailService: EmailService,
    private smsService: TelefonoService,
    private impuestoService: ImpuestoService) { }

  vehiculos: Vehiculo[] = [];
  comparendosVisibles: Comparendo[] = [];
  totalPonderado: number = 0;
  totalComparendos: number = 0;
  pagina: number = 1;
  filtro: string;
  vehiculosTotales: Vehiculo[] = [];
  private _success = new Subject<string>();
  successMessage: string;
  staticAlertClosed = false;
  filterValues = [];
  taxFlag: boolean = false;
  fineFlag: boolean = false;

  ngOnInit() {
    let body = {};

    this.vehiculosService.listarVehiculos(body)
      .subscribe(res => {
        this.vehiculos = res;
        this.consultarComparendo();
        this.consultarImpuestos();
      });
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 2500).subscribe(() => this.successMessage = null);
  }
  detalleVehiculo(placa) {
    this.router.navigate(['/detalle-vehiculo', placa]);
  }
  consultarComparendo() {
    var comparendoRequest: ComparendoRequest = new ComparendoRequest();
    comparendoRequest.numero = "8909039388";
    comparendoRequest.tipo = 4;
    comparendoRequest.placas = [];

    this.comparendoService.getComparendo(comparendoRequest).subscribe(
      res => {
        res.forEach(comparendo => {
          var existePropietario: boolean = false;
          this.vehiculos.forEach(vehiculo => {
            if (comparendo.placaVehiculo == vehiculo.licensePlate) {
              existePropietario = true;
              if (vehiculo.fines == null) {
                vehiculo.fines = [];
              }
              vehiculo.fines.push(comparendo);
              this.filterValues.push(comparendo.placaVehiculo);
            }
          });
          if (!existePropietario) {
            var vehiculoNoVinculado: Vehiculo = new Vehiculo();
            vehiculoNoVinculado.licensePlate = comparendo.placaVehiculo;
            vehiculoNoVinculado.fines = [];
            vehiculoNoVinculado.fines.push(comparendo);
            this.vehiculos.push(vehiculoNoVinculado);
            this.filterValues.push(comparendo.placaVehiculo);
          }
          this.totalComparendos++;
          this.totalPonderado += comparendo.total;
        });
        this.fineFlag = true;
        this.purgarVehiculos();
      },
      error => {
        this.fineFlag = true;
        this.purgarVehiculos();
      });
  }

  filtrarTabla() {
    this.vehiculos = [];
    this.vehiculosTotales.forEach(vehiculo => {
      if (vehiculo.licensePlate.indexOf(this.filtro.toUpperCase()) >= 0) {
        this.vehiculos.push(vehiculo);
      }
      else {
        if (vehiculo.financeSecretariat != null && vehiculo.financeSecretariat.indexOf(this.filtro.toUpperCase()) >= 0) {
          this.vehiculos.push(vehiculo);
        }
      }
    });
  }

  purgarVehiculos() {
    if (this.taxFlag && this.fineFlag) {
      var index: number = 0;
      let vehiculosTemp = [];
      vehiculosTemp.push.apply(vehiculosTemp, this.vehiculos);
      this.vehiculos = [];

      vehiculosTemp.forEach(vehiculo => {
        vehiculo.duesLength = 0;
        if (vehiculo.fines != null || vehiculo.taxes != null) {
          if (vehiculo.fines != null) {
            vehiculo.duesLength += vehiculo.fines.length;
          }
          if (vehiculo.taxes != null) {
            vehiculo.duesLength += vehiculo.taxes.length;
          }
          this.vehiculos.push(vehiculo);
        }
      });
      this.vehiculosTotales.push.apply(this.vehiculosTotales, this.vehiculos);
    }
  }

  notificarComparendos() {

    var emailRequest: EmailRequest[] = [];
    var smsRequest: SmsRequest[] = [];

    this.vehiculos.forEach(vehiculo => {
      if (vehiculo.customer != null) {
        vehiculo.fines.forEach(comparendo => {
          if (!false) {
            var emailRequestObject: EmailRequest = new EmailRequest();
            emailRequestObject.to = vehiculo.customer.email;

            emailRequestObject.text = "<b>Estimado usuario</b>: La presente es para notificarle que tiene una multa por el valor de <b> $"
              + comparendo.total + "</b> para su vehiculo <b>" + vehiculo.licensePlate + "</b> <br>Agredecemos que realice la gestión en el menor tiempo posible" +
              "<br>Cordialmente Banco Feliz";

            emailRequestObject.subject = "Multa Vehiculo : " + vehiculo.licensePlate;
            emailRequest.push(emailRequestObject);
          }
          if (!true) {
            var smsRequestObject: SmsRequest = new SmsRequest();
            smsRequestObject.to = vehiculo.customer.cellPhone;

            smsRequestObject.text = "Estimado usuario: \nLa presente es para notificarle que tiene una multa por el valor de $"
              + comparendo.total + " para su vehiculo " + vehiculo.licensePlate + " \nAgredecemos que realice la gestión en el menor tiempo posible" +
              "\nCordialmente Banco Feliz";

            smsRequest.push(smsRequestObject);
          }
        });
      }
    });
   
    this.emailService.sendEmails(emailRequest).subscribe();
    this.smsService.sendSms(smsRequest).subscribe();
    this._success.next(`Notificacion Enviada correctamente.`);
  }

  consultarImpuestos() {
    this.vehiculos.forEach(vehiculo => {
      this.impuestoService.getImpuestos(vehiculo.licensePlate).subscribe(
        res => {
          if (res.detalles != null) {
            res.detalles.forEach(impuesto => {
              if (impuesto.indPago == "SIN PAGO") {
                if (vehiculo.taxes == null) {
                  vehiculo.taxes = [];
                }
                vehiculo.taxes.push(impuesto);
              }
            });
          }
          this.taxFlag = true;
          this.purgarVehiculos();
        });
    });
    this.taxFlag = true;
    this.purgarVehiculos();
  }
}
