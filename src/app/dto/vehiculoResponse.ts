import { Comparendo } from './comparendo';
import { DetallesImpuesto } from './impuesto';
export class Vehiculo {
    licensePlate: string;
    financeSecretariat: string;
    customer: Customer;
    fines: Comparendo[];
    taxes: DetallesImpuesto[];
    duesLength:number;
}

export class Customer {
    idType: string;
    idNumber: string;
    firstName: string;
    surname: string;
    email: string;
    cellPhone: string;
}