import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtRequest } from '../dto/jwtRequest';


@Injectable()
export class JwtService {

  constructor(private http: Http) { }

  //urlBase = "http://192.168.1.77:9001"
  urlBase = "http://192.168.1.81:8080"
  sendToken(idToken) {
    let headers = new Headers({ 'Authorization': idToken });
    let option = new RequestOptions({ headers: headers });
    return this.http.get(this.urlBase + "/login", option).map((response: Response) => response.headers.get('Authorization'))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  pruebaToken(token) {
    alert('Tokenaaaaaaaa: ' + token)
    let headers = new Headers({ 'Authorization': token });
    let option = new RequestOptions({ headers: headers });
    return this.http.get(this.urlBase + '/login/test', option)
      .catch(error => Observable.throw(error.message || 'Server error'));
  }

}
