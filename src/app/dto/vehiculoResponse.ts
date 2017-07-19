import { Comparendo } from './comparendo';
export class Vehiculo {
    placa: string;
    usuario: Usuario;
    lugarExpedicion: string;
    comparendos:Comparendo[];
}

export class Usuario {
    nombre: string;
    apellido: string;
    correo: string;
    celular: string;
}