import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Comparendo} from '../dto/comparendo';

@Injectable()
export class EmailService {

  constructor(private http: Http) { }

  urlBase = "http://192.168.1.107:8080"

  sendEmails(params) {

    let body = JSON.stringify(params);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlBase+"/emails",body,options)
      
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
