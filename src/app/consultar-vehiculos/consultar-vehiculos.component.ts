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
    private smsService: TelefonoService) { }

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

  ngOnInit() {
    let body = {};

    this.vehiculosService.listarVehiculos(body)
      .subscribe(res => {
        this.vehiculos = res;
        this.searchComparendo();
      });
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 2500).subscribe(() => this.successMessage = null);
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
            this.filterValues.push(comparendo.placaVehiculo);
          }
        });
        if (!existePropietario) {
          var vehiculoNoVinculado: Vehiculo = new Vehiculo();
          vehiculoNoVinculado.licensePlate = comparendo.placaVehiculo;
          vehiculoNoVinculado.taxes = [];
          vehiculoNoVinculado.taxes.push(comparendo);
          this.vehiculos.push(vehiculoNoVinculado);
          this.filterValues.push(comparendo.placaVehiculo);
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

  notificarComparendos() {

    var emailRequest: EmailRequest[] = [];
    var smsRequest: SmsRequest[] = [];

    this.vehiculos.forEach(vehiculo => {
      if (vehiculo.customer != null) {
        vehiculo.taxes.forEach(comparendo => {
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
}
