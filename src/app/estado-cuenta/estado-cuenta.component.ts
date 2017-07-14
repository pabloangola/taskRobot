import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ComparendoService } from '../services/comparendo.service';
import { Comparendo } from '../dto/comparendo';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {

  placas = [];
  placa: string;
  comparendos: Comparendo[];

  baseUrl: string;

  constructor(private comparendoService: ComparendoService) { }

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

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  ngOnInit() {
  }

}
