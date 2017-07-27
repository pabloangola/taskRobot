import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Vehiculo } from '../dto/vehiculoResponse';
@Injectable()
export class VehiculosService {

  constructor(private http: Http) { }

  urlBase = "http://35.197.37.143:8080"

  listarVehiculos(params): Observable<Vehiculo[]> {
  // let token = localStorage.getItem('customToken');
  //  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.urlBase + "/vehicles", options)
      .map((res: Response) => res.json() as Vehiculo[])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  detalleVehiculo(placa): Observable<Vehiculo> {
  //  let token = localStorage.getItem('customToken');
    //  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.urlBase + "/vehicles/" + placa, options)
      .map((res: Response) => res.json() as Vehiculo)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  agregarVehiculo(parametros: Vehiculo[]) {
    //let token = localStorage.getItem('customToken');
     //  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(parametros);
    return this.http.post(this.urlBase + "/vehicles", body, options)
      .map((res: Response) => res.json() as any)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
