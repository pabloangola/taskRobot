import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ComparendoService } from '../services/comparendo.service';
import { EmailService } from '../services/email.service';
import { TelefonoService } from '../services/telefono.service';
import { Comparendo } from '../dto/comparendo';
import { EmailRequest } from '../dto/emailRequest';
import { ComparendoRequest } from '../dto/comparendoRequest';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';
import { SmsRequest } from '../dto/smsRequest';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {

  placas = [];
  placa: string;
  comparendos: Comparendo[];
  emailRequest: EmailRequest[] = [];
  smsRequest: SmsRequest[] = [];
  baseUrl: string;

  constructor(private comparendoService: ComparendoService,
    private emailService: EmailService,
    private smsService: TelefonoService,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  incluirPlaca() {

    let regex = /[A-Za-z]{3}[0-9]{3}/

    if (this.placa != null && this.placa != "") {
      if (regex.test(this.placa)) {
        if (!(this.placas.indexOf(this.placa) == 0)) {
          this.placas.push(this.placa.toUpperCase());
          this.placa = "";
        }
      }
      else {
        this.toastr.error("La placa ingresada no cumple con los requisitos de validacion");
      }
    }
  }

  eliminarPlaca(index) {
    this.placas.splice(index);
  }

  consultar() {

    this.comparendos = [];
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body: ComparendoRequest = new ComparendoRequest();
    body.numero = "8909039388";
    body.tipo = 4;
    body.placas = this.placas;

    this.comparendoService.getComparendo(body)
      .subscribe(res => {
        this.comparendos = res;
        this.tabReporte();
      });

  }

  tabConsulta() {
    $("#consulta").show();
    $("#respuesta").hide();
    $("#reporteTab").removeClass("active");
    $("#consultaTab").addClass("active");
  }
  tabReporte() {
    $("#consulta").hide();
    $("#respuesta").show();
    $("#reporteTab").addClass("active");
    $("#consultaTab").removeClass("active");
  }


  generarReporte() {

    this.comparendos.forEach(element => {
      var emailRequestObject: EmailRequest = new EmailRequest();
      emailRequestObject.to = "pablomanga123@gmail.com";
      emailRequestObject.text = "Estimado usuario la presente es para notificarle que tiene una multa por el valor de $"
        + element.total + " para su vehiculo " + element.placaVehiculo + " \nAgredecemos que realice la gestión en el menor tiempo posible" +
        "Cordialmente Banco Feliz";

      emailRequestObject.subject = "Multa Vehiculo : " + element.placaVehiculo;
      this.emailRequest.push(emailRequestObject);
    });
    this.emailService.sendEmails(this.emailRequest)
      .subscribe();

    /*this.comparendos.forEach(element => {
      var smsRequestObject: SmsRequest = new SmsRequest();
      smsRequestObject.to = "+573192518252";
      smsRequestObject.text = "Multa Vehiculo : " + element.placaVehiculo + " \nEstimado usuario la presente es para notificarle que tiene una multa por el valor de $"
        + element.total + " para su vehiculo " + element.placaVehiculo + " \nAgredecemos que realice la gestión en el menor tiempo posible" +
        "Cordialmente Banco Feliz";


      this.smsRequest.push(smsRequestObject);
    });*/

    this.smsService.sendSms(this.smsRequest[0])
      .subscribe();
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  ngOnInit() {
  }

}