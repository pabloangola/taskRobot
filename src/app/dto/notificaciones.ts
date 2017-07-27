import { Customer,Vehiculo } from './vehiculoResponse';
import { Comparendo } from './comparendo';
import { Impuesto } from './impuesto';

export class Notificacion{
    vehiculo:Vehiculo;
    identificador:string;
    tipo:string;
    numeroNotificacionesTelefono:number;
    notificacionesRecibidasTelefono:number;
    numeroNotificacionesEmail:number;
    notificacionesRecibidasEmail:number;
}