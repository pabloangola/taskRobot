import { Component, OnInit } from '@angular/core';
import { Vehiculo, Customer } from '../dto/vehiculoResponse';
import { VehiculosService } from '../services/vehiculos.service';


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



  constructor(private vehiculosService: VehiculosService, ) {


  }
  vehiculos: Vehiculo[] = [];

  ngOnInit() {


  }


  agregarVehiculos() {
   

    var vehiculo = new Vehiculo();

  /* vehiculo.licensePlate = "RMX200";
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
    alert("Vehículo agregado correctamente");

    this.vehiculos.push(vehiculo);
    this.vehiculosService.agregarVehiculo(this.vehiculos).subscribe();
  }

}
