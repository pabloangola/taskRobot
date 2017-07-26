import { Component, OnInit } from '@angular/core';
import { Vehiculo, Customer } from '../dto/vehiculoResponse';
import { VehiculosService } from '../services/vehiculos.service';
import { JwtService } from '../services/jwt.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  placa: string = "";
  lugar_expedicion: string = "";
  nombres: string = "";
  apellidos: string = "";
  email: string = "";
  telefono: string = "";
  tipo_identificacion: string = "";
  identificacion: string = "";



  constructor(private vehiculosService: VehiculosService, private jwtService: JwtService) {


  }
  vehiculos: Vehiculo[] = [];
  private _success = new Subject<string>();
  successMessage: string;
  staticAlertClosed = false;
  ngOnInit() {

    setTimeout(() => this.staticAlertClosed = true);

    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5500).subscribe(() => this.successMessage = null);
  }

  agregarVehiculos() {

    var vehiculo = new Vehiculo();

   /* vehiculo.licensePlate = "RMX202";
    vehiculo.financeSecretariat = "Bogotá D.C";
    vehiculo.customer = new Customer;
    vehiculo.customer.idType = "Cédula de Ciudadanía";
    vehiculo.customer.idNumber = "1020715321";
    vehiculo.customer.firstName = "Pepito";
    vehiculo.customer.surname = "Perez";
    vehiculo.customer.email = "pablo.angola@aossas.com";
    vehiculo.customer.cellPhone = "3214567777";*/

    vehiculo.licensePlate = this.placa;
    vehiculo.financeSecretariat = this.lugar_expedicion;
    vehiculo.customer = new Customer;
    vehiculo.customer.idType = this.tipo_identificacion;
    vehiculo.customer.idNumber = this.identificacion;
    vehiculo.customer.firstName = this.nombres;
    vehiculo.customer.surname = this.apellidos;
    vehiculo.customer.email = this.email;
    vehiculo.customer.cellPhone = this.telefono;

    this.vehiculos.push(vehiculo);
    this.vehiculosService.agregarVehiculo(this.vehiculos).subscribe(
      error => console.error(error)
    );
    this._success.next('Vehiculo almacenado correctamente.');

  }


  
}
