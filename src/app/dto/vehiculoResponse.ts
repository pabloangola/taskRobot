import { Comparendo } from './comparendo';
export class Vehiculo {
    placa: string;
    clientes: Cliente[];
    modelo: string;
    tipoVehiculo: string;
    marca: string;
    year: string;
    lugarExpedicion: string;
    comparendos:Comparendo[];
}

export class Cliente {
    tipoDeDocumento: string;
    documento: string;
    nombre: string;
    apellido: string;
    correo: string;
    celular: string;
}