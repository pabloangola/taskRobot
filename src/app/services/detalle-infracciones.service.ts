import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Infraccion } from '../dto/infraccion'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DetalleInfraccionesService {

  constructor(private http: Http) { }

  urlBase = "http://35.197.37.143:8082"

  detalleInfraccion(): Observable<Infraccion> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get("./", options)
      .map((res: Response) => res.json() as Infraccion)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}

