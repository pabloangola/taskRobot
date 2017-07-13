import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-vehiculos',
  templateUrl: './consultar-vehiculos.component.html',
  styleUrls: ['./consultar-vehiculos.component.css']
})
export class ConsultarVehiculosComponent implements OnInit {

  constructor() { }

  vehiculos = [];

  ngOnInit() {

  }

  searchData(){
    var vehiculo = {
      "placa":"VGE756",
      "modelo":"FG21",
      "tipo":"Carretera",
      "marca":"Mercedez-Bendz",
      "año":"2015",
      "sitio":"Bogota"
    }
    this.vehiculos.push(vehiculo);
  }

}
