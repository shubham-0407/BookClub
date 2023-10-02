import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {

  constructor(private httpClient: HttpClient) { }

  /** Intialize cart */
  createOrder(body: any){
    let url = environment.ORDER_BASE_URL + environment.ORDER.REG_ORDER;
    console.log("API call: ", url);
    return this.httpClient.post(url,body);
  }

  /** Adding to my-order */
  addItemOrder(body: any){
    let url = environment.ORDER_BASE_URL + environment.ORDER.ADD;
    console.log("API call: ", url);
    console.log(body);
    return this.httpClient.put(url,body);
  }

  /** View My order */
  viewMyOrder(id:string){
    let url = environment.ORDER_BASE_URL + environment.ORDER.VIEW_ORDER +id;
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }
}
