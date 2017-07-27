import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../dto/notificaciones';
import { Vehiculo , Customer } from '../dto/vehiculoResponse';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  constructor() { }

  notificaciones:Notificacion[] = [];

  ngOnInit() {
    this.consultarNotificaciones();
  }

  consultarNotificaciones(){
    var notificacion_1:Notificacion = new Notificacion();
    notificacion_1.identificador="01215103186165310";
    notificacion_1.vehiculo = new Vehiculo();
    notificacion_1.vehiculo.customer = new Customer();
    notificacion_1.vehiculo.customer.firstName = "Juanito";
    notificacion_1.vehiculo.customer.surname = "Perez";
    notificacion_1.vehiculo.licensePlate = "RMX200";
    notificacion_1.tipo = "Impuesto";
    notificacion_1.notificacionesRecibidasEmail = 3;
    notificacion_1.numeroNotificacionesEmail = 4;
    notificacion_1.notificacionesRecibidasTelefono = 10;
    notificacion_1.numeroNotificacionesTelefono = 12;

    var notificacion_2:Notificacion = new Notificacion();
    notificacion_2.identificador="151841818";
    notificacion_2.vehiculo = new Vehiculo();
    notificacion_2.vehiculo.customer = new Customer();
    notificacion_2.vehiculo.customer.firstName = "Pedro";
    notificacion_2.vehiculo.customer.surname = "Jimenez";
    notificacion_2.vehiculo.licensePlate = "REX020";
    notificacion_2.tipo = "Multa";
    notificacion_2.notificacionesRecibidasEmail = 4;
    notificacion_2.numeroNotificacionesEmail = 4;
    notificacion_2.notificacionesRecibidasTelefono = 10;
    notificacion_2.numeroNotificacionesTelefono = 10;

    var notificacion_3:Notificacion = new Notificacion();
    notificacion_3.identificador="1564816800051";
    notificacion_3.vehiculo = new Vehiculo();
    notificacion_3.vehiculo.customer = new Customer();
    notificacion_3.vehiculo.customer.firstName = "Juanito";
    notificacion_3.vehiculo.customer.surname = "Perez";
    notificacion_3.vehiculo.licensePlate = "RMX200";
    notificacion_3.tipo = "Impuesto";
    notificacion_3.notificacionesRecibidasEmail = 4;
    notificacion_3.numeroNotificacionesEmail = 6;
    notificacion_3.notificacionesRecibidasTelefono = 8;
    notificacion_3.numeroNotificacionesTelefono = 8;

    this.notificaciones.push(notificacion_1);
    this.notificaciones.push(notificacion_2);
    this.notificaciones.push(notificacion_3);
  }

}
