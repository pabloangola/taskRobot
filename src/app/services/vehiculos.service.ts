import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Vehiculo } from '../dto/vehiculoResponse';
@Injectable()
export class VehiculosService {

  constructor(private http: Http) { }

  urlBase = "http://35.197.37.143:8082"

  getVehiculo(params): Observable<Vehiculo[]> {

    let body = JSON.stringify(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.urlBase + "/vehicles", options)
      .map((res: Response) => res.json() as Vehiculo[])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
