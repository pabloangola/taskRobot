import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtRequest } from '../dto/jwtRequest';


@Injectable()
export class JwtService {

  constructor(private http: Http) { }

  urlBase = "http://192.168.1.77:9001"

  sendToken(params:JwtRequest) {
    
    let headers = new Headers({ 'Authorization':  params.token });
    let option = new RequestOptions({ headers: headers });
    return this.http.get(this.urlBase+"/login", option).map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
