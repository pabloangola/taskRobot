import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ComparendoService } from '../services/comparendo.service';
import { EmailService } from '../services/email.service';
import { Comparendo } from '../dto/comparendo';
import { EmailRequest } from '../dto/emailRequest';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {

  placas = [];
  placa: string;
  comparendos: Comparendo[];
  emailRequest:EmailRequest[] = [];
  baseUrl: string;

  constructor(private comparendoService: ComparendoService, private emailService: EmailService) { }

  incluirPlaca() {
    this.placas.push(this.placa);
    this.placa = "";
  }

  consultar() {
    alert('entro');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body = { "tipo": 4, "numero": "8909039388" }

    this.comparendoService.getComparendo(body)
      .subscribe(res => this.comparendos = res);
  }


  generarReporte() {
    alert('genero el reporte ');

      this.comparendos.forEach(element => {
        var emailRequestObject : EmailRequest = new EmailRequest();
        emailRequestObject.to = "michael.gallego@aossas.com";
        emailRequestObject.text = "Estimado usuario la presente es para notificarle que tiene una multa por el valor de $"
                                   + element.total +" para su vehiculo " + element.placaVehiculo + " \nAgredecemos que realice la gestión en el menor tiempo posible"+
                                   "Cordialmente Banco Feliz" ;
                                  
        emailRequestObject.subject= "Multa Vehiculo : " + element.placaVehiculo ;
        this.emailRequest.push(emailRequestObject);
      });

      this.emailService.sendEmails( this.emailRequest[0])
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