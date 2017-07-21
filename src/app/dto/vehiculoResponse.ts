import { Comparendo } from './comparendo';
export class Vehiculo {
    licensePlate: string;
    financeSecretariat:string;
    customer: Customer;
    taxes:Comparendo[];
}

export class Customer {
    idType: string;
    idNumber: string;
    firstName: string;
    surname: string;
    email: string;
    cellPhone: string;
}