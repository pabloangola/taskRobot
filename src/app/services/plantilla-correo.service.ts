import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PlantillaCorreo } from '../dto/plantillaCorreo';
@Injectable()
export class PlantillaCorreoService {

   constructor(private http: Http) { }

  urlBase = "http://192.168.1.70:8083"
//urlBase = "http://192.168.1.70:8082"
    guardarPlantilla(parametros: PlantillaCorreo) {
    //let token = localStorage.getItem('customToken');
     //  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(parametros);
    return this.http.post(this.urlBase + "/parametrization", body, options)
      .map((res: Response) => res.json() as any)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    traerPlantilla(): Observable<PlantillaCorreo> {
  // let token = localStorage.getItem('customToken');
  //  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.urlBase + "/parametrization", options)
      .map((res: Response) => res.json() as PlantillaCorreo)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
