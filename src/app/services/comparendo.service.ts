import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Comparendo} from '../dto/comparendo';

@Injectable()
export class ComparendoService {

  constructor(private http: Http) { }

  urlBase = "http://192.168.1.113:8080"

  getComparendo(params): Observable<Comment[]> {

    let body = JSON.stringify(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlBase+"/comparendos",params,options)
      .map((res: Response) => res.json() as Comparendo[])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
