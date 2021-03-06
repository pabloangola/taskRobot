import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Vehiculo } from '../dto/vehiculoResponse';
@Injectable()
export class VehiculosService {

  constructor(private http: Http) { }

  urlBase = "http://192.168.1.107:8080"

  getVehiculo(params): Observable<Vehiculo[]> {

    let body = JSON.stringify(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlBase + "/vehiculos", body, options)
      .map((res: Response) => res.json() as Vehiculo[])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
