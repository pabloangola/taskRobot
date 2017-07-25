 import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 

@Injectable()
export class TelefonoService {

  constructor(private http: Http) { }

  urlBase = "http://192.168.1.107:8080"

  sendSms(params) {
    //let token = localStorage.getItem('customToken');
    let body = JSON.stringify(params);
     //  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlBase+"/SMSs",body,options)
      
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}

