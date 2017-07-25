import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Impuesto } from '../dto/impuesto';

@Injectable()
export class ImpuestoService {

  constructor(private http: Http) { }

  urlBase = "http://recursosweb.shd.gov.co/ConsultaPagos/resources/servicios/"

  getImpuestos(placa): Observable<Impuesto> {

    let body = "?impuesto=3&objeto="+placa;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.urlBase + "/relacionPagos" + body, options)
      .map((res: Response) => res.json() as Impuesto)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}

