import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Comparendo } from '../dto/comparendo';

@Injectable()
export class ComparendoService {

  constructor(private http: Http) { }

  urlBase = "http://35.197.37.143:8080"

  getComparendo(params): Observable<Comparendo[]> {
    //let token = localStorage.getItem('customToken');
    let body = JSON.stringify(params);
    //  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlBase + "/fine", body, options)
      .map((res: Response) => res.json() as Comparendo[])
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
