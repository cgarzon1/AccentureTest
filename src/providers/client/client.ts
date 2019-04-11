import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//importar interfaces
import { addClientIn } from '../../interfaces/addClient';


@Injectable()
export class ClientProvider {

  data: any;
  error: any;

  pathgGetClient: string = "https://testbankapi.firebaseio.com/clients.json";
  pathPostClient: string = "https://testbankapi.firebaseio.com/clients.json";


  constructor(public http: Http) {
    this.data = null;
  }


  /**
   * Metodo para agregar clientes
   * @param infoClient 
   */
  addClient(infoClient: addClientIn) {

    let url = this.pathPostClient;
    let body = infoClient;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise
      (
        (resolve, reject) => {
          this.http.post(url, body, options)
            .map(res => res.json())
            .subscribe
            (
              data => { resolve(data); },
              error => {
                reject(error)
                console.log("ERROR", error);;
              }
            )
        }
      );
  }

  /**
   * Optener datos clientes
   */
  getClient() {
    return new Promise
      (
        (resolve, reject) => {
          this.http.get(this.pathgGetClient)
            .map(res => res.json())
            .subscribe
            (
              data => { resolve(data); },
              error => { reject(error); }
            )
        }
      );
  }

}
